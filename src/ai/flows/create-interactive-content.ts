'use server';

/**
 * @fileOverview AI tool to automatically create adaptive quizzes, study notes, diagrams, visuals, charts, and animated aids suitable for multi-grade classrooms based on teacher input.
 *
 * - createInteractiveContent - A function that handles the generation of interactive content.
 * - CreateInteractiveContentInput - The input type for the createInteractiveContent function.
 * - CreateInteractiveContentOutput - The return type for the createInteractiveContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreateInteractiveContentInputSchema = z.object({
  lessonTopic: z.string().describe('The topic of the lesson for which to generate content.'),
  gradeLevels: z
    .string()
    .describe(
      'The grade levels of the students for whom the content is being generated, such as "1-3" or "4-6".' + ' Multiple ranges can be specified separated by commas, such as "1-3,4-6".'
    ),
  contentPreferences: z
    .string()
    .describe(
      'The preferred content types and styles, such as "adaptive quizzes, study notes, diagrams, visuals, charts, and animated aids".'
    ),
});
export type CreateInteractiveContentInput = z.infer<typeof CreateInteractiveContentInputSchema>;

const CreateInteractiveContentOutputSchema = z.object({
  adaptiveQuizzes: z.string().describe('Adaptive quizzes suitable for the specified grade levels.'),
  studyNotes: z.string().describe('Study notes tailored to the lesson topic and grade levels.'),
  diagrams: z.string().describe('Descriptions or specifications for diagrams to illustrate the lesson.'),
  visuals: z.string().describe('Ideas for visuals or images to enhance understanding.'),
  charts: z.string().describe('Data or descriptions for charts relevant to the lesson.'),
  animatedAids: z.string().describe('Suggestions for animated aids to engage students.'),
});
export type CreateInteractiveContentOutput = z.infer<typeof CreateInteractiveContentOutputSchema>;

export async function createInteractiveContent(input: CreateInteractiveContentInput): Promise<CreateInteractiveContentOutput> {
  return createInteractiveContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createInteractiveContentPrompt',
  input: {schema: CreateInteractiveContentInputSchema},
  output: {schema: CreateInteractiveContentOutputSchema},
  prompt: `You are an expert teacher specializing in creating engaging and educational content for multi-grade classrooms.

You will use the provided lesson topic, grade levels, and content preferences to generate a variety of interactive content.

Specifically, create the following:

*   Adaptive Quizzes: Generate quizzes that adapt to different skill levels within the specified grade levels.
*   Study Notes: Create concise and informative study notes that cover the key concepts of the lesson topic.
*   Diagrams: Describe the diagrams needed to visually represent complex information.
*   Visuals: Suggest visuals or images that can be used to enhance understanding and engagement.
*   Charts: Provide data or descriptions for charts that illustrate relevant data or trends.
*   Animated Aids: Suggest ideas for animated aids that can make the lesson more interactive and engaging.

Lesson Topic: {{{lessonTopic}}}
Grade Levels: {{{gradeLevels}}}
Content Preferences: {{{contentPreferences}}}

Output:
adaptiveQuizzes: Adaptive quizzes suitable for the specified grade levels.
studyNotes: Study notes tailored to the lesson topic and grade levels.
diagrams: Descriptions or specifications for diagrams to illustrate the lesson.
visuals: Ideas for visuals or images to enhance understanding.
charts: Data or descriptions for charts relevant to the lesson.
animatedAids: Suggestions for animated aids to engage students.`,
});

const createInteractiveContentFlow = ai.defineFlow(
  {
    name: 'createInteractiveContentFlow',
    inputSchema: CreateInteractiveContentInputSchema,
    outputSchema: CreateInteractiveContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
