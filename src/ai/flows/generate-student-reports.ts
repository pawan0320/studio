'use server';

/**
 * @fileOverview AI flow to generate daily student reports after each class.
 *
 * - generateStudentReport - A function to generate a student report.
 * - GenerateStudentReportInput - The input type for the generateStudentReport function.
 * - GenerateStudentReportOutput - The return type for the generateStudentReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateStudentReportInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  className: z.string().describe('The name of the class.'),
  participationLevel: z.string().describe('The level of participation of the student in class.'),
  quizScore: z.number().describe('The score of the student on the quiz.'),
  assignmentScore: z.number().describe('The score of the student on the assignment.'),
  engagementInsights: z.string().describe('Insights on the engagement of the student in class.'),
  behaviorInsights: z.string().describe('Insights on the behavior of the student in class.'),
  teacherFeedback: z.string().describe('Feedback from the teacher about the student.'),
});

export type GenerateStudentReportInput = z.infer<typeof GenerateStudentReportInputSchema>;

const GenerateStudentReportOutputSchema = z.object({
  report: z.string().describe('The generated student report.'),
});

export type GenerateStudentReportOutput = z.infer<typeof GenerateStudentReportOutputSchema>;

export async function generateStudentReport(input: GenerateStudentReportInput): Promise<GenerateStudentReportOutput> {
  return generateStudentReportFlow(input);
}

const generateStudentReportPrompt = ai.definePrompt({
  name: 'generateStudentReportPrompt',
  input: {schema: GenerateStudentReportInputSchema},
  output: {schema: GenerateStudentReportOutputSchema},
  prompt: `You are an AI assistant helping teachers generate daily student reports.

  Given the following information, generate a comprehensive student report:

  Student Name: {{{studentName}}}
  Class Name: {{{className}}}
  Participation Level: {{{participationLevel}}}
  Quiz Score: {{{quizScore}}}
  Assignment Score: {{{assignmentScore}}}
  Engagement Insights: {{{engagementInsights}}}
  Behavior Insights: {{{behaviorInsights}}}
  Teacher Feedback: {{{teacherFeedback}}}

  Please provide a detailed report that includes a summary of the student's performance, engagement, and behavior, as well as any specific feedback from the teacher. The report should be concise and informative.`,
});

const generateStudentReportFlow = ai.defineFlow(
  {
    name: 'generateStudentReportFlow',
    inputSchema: GenerateStudentReportInputSchema,
    outputSchema: GenerateStudentReportOutputSchema,
  },
  async input => {
    const {output} = await generateStudentReportPrompt(input);
    return output!;
  }
);
