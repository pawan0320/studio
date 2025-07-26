// src/ai/flows/analyze-student-performance.ts
'use server';

/**
 * @fileOverview AI Student Analytics flow.
 *
 * This file defines a Genkit flow for analyzing student performance based on comprehension,
 * participation, and feedback, generating tailored teaching aids and engagement strategies.
 *
 * - analyzeStudentPerformance - Analyzes student data and provides insights.
 * - AnalyzeStudentPerformanceInput - Input type for the analyzeStudentPerformance function.
 * - AnalyzeStudentPerformanceOutput - Output type for the analyzeStudentPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeStudentPerformanceInputSchema = z.object({
  studentName: z.string().describe('The name of the student.'),
  lessonContent: z.string().describe('The content of the lesson.'),
  studentFeedback: z.string().describe('Student feedback on the lesson.'),
  participationLevel: z.string().describe('Student participation levels during the lesson.'),
  quizScores: z.string().describe('Student scores on quizzes.'),
  assignmentScores: z.string().describe('Student scores on assignments.'),
});

export type AnalyzeStudentPerformanceInput = z.infer<typeof AnalyzeStudentPerformanceInputSchema>;

const AnalyzeStudentPerformanceOutputSchema = z.object({
  comprehensionLevel: z.string().describe('The student comprehension level.'),
  suggestedTeachingAids: z.string().describe('Suggestions for tailored teaching aids.'),
  engagementStrategies: z.string().describe('Engagement strategies for mixed-grade classrooms.'),
  studentQuestions: z.string().describe('Student questions generated from the lesson.'),
  insights: z.string().describe('Insights on student performance.'),
});

export type AnalyzeStudentPerformanceOutput = z.infer<typeof AnalyzeStudentPerformanceOutputSchema>;

export async function analyzeStudentPerformance(
  input: AnalyzeStudentPerformanceInput
): Promise<AnalyzeStudentPerformanceOutput> {
  return analyzeStudentPerformanceFlow(input);
}

const analyzeStudentPerformancePrompt = ai.definePrompt({
  name: 'analyzeStudentPerformancePrompt',
  input: {schema: AnalyzeStudentPerformanceInputSchema},
  output: {schema: AnalyzeStudentPerformanceOutputSchema},
  prompt: `Analyze the student's performance based on the following information:

Student Name: {{{studentName}}}
Lesson Content: {{{lessonContent}}}
Student Feedback: {{{studentFeedback}}}
Participation Level: {{{participationLevel}}}
Quiz Scores: {{{quizScores}}}
Assignment Scores: {{{assignmentScores}}}

Evaluate the student's comprehension, participation, and feedback.
Provide adaptive suggestions for tailored teaching aids and generate student questions, insights, and engagement strategies for mixed-grade classrooms.`,
});

const analyzeStudentPerformanceFlow = ai.defineFlow(
  {
    name: 'analyzeStudentPerformanceFlow',
    inputSchema: AnalyzeStudentPerformanceInputSchema,
    outputSchema: AnalyzeStudentPerformanceOutputSchema,
  },
  async input => {
    const {output} = await analyzeStudentPerformancePrompt(input);
    return output!;
  }
);
