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
import wav from 'wav';

const GenerateLessonMaterialsInputSchema = z.object({
  lessonContentText: z.string().optional().describe('The lesson content as text.'),
  lessonContentImage: z
    .string()
    .optional()
    .describe(
      "The lesson content as an image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
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

const generateLessonMaterialsPrompt = ai.definePrompt({
  name: 'generateLessonMaterialsPrompt',
  input: {schema: GenerateLessonMaterialsInputSchema},
  output: {schema: GenerateLessonMaterialsOutputSchema},
  prompt: `You are an AI assistant designed to generate lesson materials for teachers. Given the lesson content (either as text, image, or voice), you will generate an animated PPT, an AI-generated video explaining the lesson, and a localized quiz.

  The language you will localize to is: {{{localizationLanguage}}}

  The lesson content is as follows:

  {{#if lessonContentText}}
  Text: {{{lessonContentText}}}
  {{/if}}

  {{#if lessonContentImage}}
  Image: {{media url=lessonContentImage}}
  {{/if}}

  {{#if lessonContentVoice}}
  Voice: {{media url=lessonContentVoice}}
  {{/if}}
  `,
});

const generateLessonMaterialsFlow = ai.defineFlow(
  {
    name: 'generateLessonMaterialsFlow',
    inputSchema: GenerateLessonMaterialsInputSchema,
    outputSchema: GenerateLessonMaterialsOutputSchema,
  },
  async input => {
    // Step 1: Generate the animated PPT.
    const pptPrompt = `Create an animated PPT based on the lesson content. Return it as a base64 encoded data URI with content type application/vnd.ms-powerpoint.
     Follow these instructions very carefully:
      - DO NOT use real PPT format. Instead, return an HTML file with javascript that recreates PPT animations.
      - Use very short, and very modern, JS code.
      - Make sure the final result is a base64 encoded file.
    `;
    const pptResult = await ai.generate({
      prompt: pptPrompt,
      model: 'googleai/gemini-2.0-flash',
    });
    const animatedPPTDataUri = pptResult.text!;

    // Step 2: Generate the AI-generated video.
    // Assuming we can generate a video from the content description.
    // This may require the use of an image generation model, or a video generation model.

    let { operation } = await ai.generate({
      model: 'googleai/veo-2.0-generate-001',
      prompt: 'Generate a video explaining the lesson visually.',
      config: {
        durationSeconds: 5,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    while (!operation.done) {
      operation = await ai.checkOperation(operation);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (operation.error) {
      throw new Error('failed to generate video: ' + operation.error.message);
    }

    const video = operation.output?.message?.content.find((p) => !!p.media);
    if (!video) {
      throw new Error('Failed to find the generated video');
    }

    const fetch = (await import('node-fetch')).default;
    const videoDownloadResponse = await fetch(
        `${video.media!.url}&key=${process.env.GEMINI_API_KEY}`
    );
    if (
        !videoDownloadResponse ||
        videoDownloadResponse.status !== 200 ||
        !videoDownloadResponse.body
    ) {
      throw new Error('Failed to fetch video');
    }
    const aiGeneratedVideoBase64 = Buffer.from(await videoDownloadResponse.arrayBuffer()).toString('base64');
    const aiGeneratedVideoDataUri = `data:video/mp4;base64,${aiGeneratedVideoBase64}`;

    // Step 3: Generate the localized quiz.
    const quizPrompt = `Create a localized quiz in {{{localizationLanguage}}} based on the lesson content.  Return the quiz as a base64 encoded data URI with content type application/json.`
    const quizResult = await ai.generate({
      prompt: quizPrompt,
      model: 'googleai/gemini-2.0-flash',
    });
    const localizedQuizDataUri = quizResult.text!;

    return {
      animatedPPTDataUri,
      aiGeneratedVideoDataUri,
      localizedQuizDataUri,
    };
  }
);
