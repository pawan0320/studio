// A file containing the AI assistant flow for teachers.
// It helps teachers with lesson planning, student performance tracking, group management, and multi-grade teaching strategies.

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiTeacherAssistantInputSchema = z.object({
  task: z.string().describe('The task the teacher needs assistance with.'),
  context: z.string().optional().describe('Additional context for the task, such as lesson plan details, student information, or classroom setting.'),
});
export type AiTeacherAssistantInput = z.infer<typeof AiTeacherAssistantInputSchema>;

const AiTeacherAssistantOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response to the teacher\'s task, providing relevant information, suggestions, or strategies.'),
});
export type AiTeacherAssistantOutput = z.infer<typeof AiTeacherAssistantOutputSchema>;

export async function aiTeacherAssistant(input: AiTeacherAssistantInput): Promise<AiTeacherAssistantOutput> {
  return aiTeacherAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiTeacherAssistantPrompt',
  input: {schema: AiTeacherAssistantInputSchema},
  output: {schema: AiTeacherAssistantOutputSchema},
  prompt: `You are an AI assistant for teachers, providing support for various classroom activities.

The teacher needs help with the following task: {{{task}}}

Here's some additional context:
{{{context}}}

Provide a helpful and informative response to assist the teacher. Consider lesson planning, student performance, group dynamics and multi-grade teaching strategies when formulating your response.`,
});

const aiTeacherAssistantFlow = ai.defineFlow(
  {
    name: 'aiTeacherAssistantFlow',
    inputSchema: AiTeacherAssistantInputSchema,
    outputSchema: AiTeacherAssistantOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
