// Implemented the divideStudentsIntoGroups flow that takes student names, skills, and interests as input and returns AI-generated groups optimized for multi-grade settings.

'use server';

/**
 * @fileOverview A flow to divide students into groups based on skills and interests.
 *
 * - divideStudentsIntoGroups - A function that divides students into groups.
 * - DivideStudentsInput - The input type for the divideStudentsIntoGroups function.
 * - DivideStudentsOutput - The return type for the divideStudentsIntoGroups function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DivideStudentsInputSchema = z.object({
  studentNames: z.string().describe('A comma-separated list of student names.'),
  skills: z.string().describe('A comma-separated list of student skills.'),
  interests: z.string().describe('A comma-separated list of student interests.'),
  groupSize: z.number().describe('The desired group size.'),
});
export type DivideStudentsInput = z.infer<typeof DivideStudentsInputSchema>;

const DivideStudentsOutputSchema = z.object({
  groups: z.array(
    z.object({
      studentNames: z.array(z.string()).describe('List of student names in the group'),
      groupSkills: z.array(z.string()).describe('List of student skills in the group'),
      groupInterests: z.array(z.string()).describe('List of student interests in the group'),
    })
  ).describe('An array of student groups, with each group containing student names, skills, and interests.'),
});
export type DivideStudentsOutput = z.infer<typeof DivideStudentsOutputSchema>;

export async function divideStudentsIntoGroups(input: DivideStudentsInput): Promise<DivideStudentsOutput> {
  return divideStudentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'divideStudentsPrompt',
  input: {schema: DivideStudentsInputSchema},
  output: {schema: DivideStudentsOutputSchema},
  prompt: `You are an AI assistant that helps teachers divide students into groups.

  Given the following student names, skills, and interests, create groups based on the desired group size, balanced skills, and shared interests. Optimize for multi-grade settings to foster collaboration.

  Student Names: {{{studentNames}}}
  Skills: {{{skills}}}
  Interests: {{{interests}}}
  Group Size: {{{groupSize}}}

  Format the output as a JSON array of groups. Each group should contain a list of student names, a list of skills, and a list of interests.

  Example:
  [
    {
      "studentNames": ["Alice", "Bob"],
      "groupSkills": ["Reading", "Writing"],
      "groupInterests": ["Science", "Math"]
    },
    {
      "studentNames": ["Charlie", "David"],
      "groupSkills": ["Math", "Science"],
      "groupInterests": ["Art", "Music"]
    }
  ]
  `,
});

const divideStudentsFlow = ai.defineFlow(
  {
    name: 'divideStudentsFlow',
    inputSchema: DivideStudentsInputSchema,
    outputSchema: DivideStudentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
