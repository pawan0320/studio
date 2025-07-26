'use server';

/**
 * @fileOverview Generates lesson materials including animated PPTs, AI-generated videos, and localized quizzes.
 *
 * - generateLessonMaterials - A function that handles the generation of lesson materials.
 * - GenerateLessonMaterialsInput - The input type for the generateLessonMaterials function.
 * - GenerateLessonMaterialsOutput - The return type for the generateLessonMaterials function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLessonMaterialsInputSchema = z.object({
  lessonContentText: z.string().optional().describe('The lesson content as text.'),
  lessonContentImage: z
    .string()
    .optional()
    .describe(
      "The lesson content as an image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
  lessonContentVoice: z
    .string()
    .optional()
    .describe(
      "The lesson content as voice, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  localizationLanguage: z.string().describe('The language to localize the generated materials to.'),
});
export type GenerateLessonMaterialsInput = z.infer<typeof GenerateLessonMaterialsInputSchema>;

const GenerateLessonMaterialsOutputSchema = z.object({
  animatedPPTDataUri: z
    .string()
    .describe(
      'The animated PPT as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
  aiGeneratedVideoDataUri: z
    .string()
    .describe(
      'The AI-generated video explaining the lesson, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
  localizedQuizDataUri: z
    .string()
    .describe(
      'The localized quiz as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type GenerateLessonMaterialsOutput = z.infer<typeof GenerateLessonMaterialsOutputSchema>;

export async function generateLessonMaterials(input: GenerateLessonMaterialsInput): Promise<GenerateLessonMaterialsOutput> {
  return generateLessonMaterialsFlow(input);
}

const generateLessonMaterialsFlow = ai.defineFlow(
  {
    name: 'generateLessonMaterialsFlow',
    inputSchema: GenerateLessonMaterialsInputSchema,
    outputSchema: GenerateLessonMaterialsOutputSchema,
  },
  async (input) => {
    const [animatedPPTResponse, localizedQuizResponse] = await Promise.all([
      ai.generate({
        prompt: `Create an animated PPT based on the provided lesson content.
          Follow these instructions very carefully:
          - DO NOT use real PPT format. Instead, return an HTML file with javascript that recreates PPT animations.
          - Use very short, and very modern, JS code.
          Lesson content: ${input.lessonContentText || ''}
        `,
        model: 'googleai/gemini-2.0-flash',
      }),
      ai.generate({
        prompt: `Create a localized quiz in ${input.localizationLanguage} based on the lesson content. Return the quiz as a JSON object.
          Lesson content: ${input.lessonContentText || ''}
        `,
        model: 'googleai/gemini-2.0-flash',
      })
    ]);

    let videoDataUri = '';
    try {
      let {operation} = await ai.generate({
        model: 'veo-2.0-generate-001',
        prompt: [
          {
            text: `A short video about: ${input.lessonContentText}`,
          },
        ],
        config: {
          durationSeconds: 5,
          aspectRatio: '16:9',
        },
      });

      if (operation) {
        while (!operation.done) {
          operation = await ai.checkOperation(operation);
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }

        if (operation.output) {
          const video = operation.output.message?.content.find(
            (p) => !!p.media
          );
          if (video?.media?.url) {
            const fetch = (await import('node-fetch')).default;
            const videoDownloadResponse = await fetch(
              `${video.media.url}&key=${process.env.GEMINI_API_KEY}`
            );
            if (videoDownloadResponse.ok) {
              const videoBuffer = await videoDownloadResponse.arrayBuffer();
              videoDataUri = `data:video/mp4;base64,${Buffer.from(
                videoBuffer
              ).toString('base64')}`;
            }
          }
        }
      }
    } catch (e) {
      console.error('Video generation failed, providing placeholder', e);
    }
    
    if (!videoDataUri) {
      // Fallback to a placeholder if video generation fails
      const {media} = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: `A simple, abstract, and modern image that represents: ${input.lessonContentText}. The image should be visually appealing and suitable for a lesson presentation.`,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });
      if (media?.url) {
        videoDataUri = media.url; // Using image data URI as a fallback
      }
    }

    return {
      animatedPPTDataUri: `data:text/html;base64,${Buffer.from(animatedPPTResponse.text, 'utf8').toString('base64')}`,
      aiGeneratedVideoDataUri: videoDataUri,
      localizedQuizDataUri: `data:application/json;base64,${Buffer.from(localizedQuizResponse.text, 'utf8').toString('base64')}`,
    };
  }
);
