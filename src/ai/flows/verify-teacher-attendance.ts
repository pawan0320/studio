'use server';

/**
 * @fileOverview Verifies teacher attendance using AI-based face recognition.
 *
 * - verifyTeacherAttendance - A function that verifies teacher attendance based on facial recognition.
 * - VerifyTeacherAttendanceInput - The input type for the verifyTeacherAttendance function.
 * - VerifyTeacherAttendanceOutput - The return type for the verifyTeacherAttendance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VerifyTeacherAttendanceInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the teacher's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  teacherName: z.string().describe('The name of the teacher.'),
  timestamp: z.string().describe('The timestamp of the attendance check.'),
});
export type VerifyTeacherAttendanceInput = z.infer<typeof VerifyTeacherAttendanceInputSchema>;

const VerifyTeacherAttendanceOutputSchema = z.object({
  isRecognized: z.boolean().describe('Whether the teacher is recognized.'),
  attendanceMarked: z.boolean().describe('Whether attendance was successfully marked.'),
  activityLogged: z.boolean().describe('Whether the activity was successfully logged.'),
  confidenceLevel: z.number().describe('The confidence level of the face recognition.'),
});
export type VerifyTeacherAttendanceOutput = z.infer<typeof VerifyTeacherAttendanceOutputSchema>;

export async function verifyTeacherAttendance(input: VerifyTeacherAttendanceInput): Promise<VerifyTeacherAttendanceOutput> {
  return verifyTeacherAttendanceFlow(input);
}

const verifyTeacherAttendancePrompt = ai.definePrompt({
  name: 'verifyTeacherAttendancePrompt',
  input: {schema: VerifyTeacherAttendanceInputSchema},
  output: {schema: VerifyTeacherAttendanceOutputSchema},
  prompt: `You are an AI attendance system that verifies teacher attendance using facial recognition.

You will use the provided information to determine if the teacher is recognized and mark their attendance.

Consider these factors to make your determination:
- Facial similarity between the provided photo and known teacher photos.
- Confidence level of the facial recognition.
- Verification against the teacher's provided name.

Based on your analysis, determine the following:
- isRecognized: true if the teacher is recognized with high confidence, false otherwise.
- attendanceMarked: true if attendance is successfully marked, false otherwise.
- activityLogged: true if the activity is successfully logged, false otherwise.
- confidenceLevel: A numerical value representing the confidence level of the face recognition.

Teacher Name: {{{teacherName}}}
Timestamp: {{{timestamp}}}
Teacher Photo: {{media url=photoDataUri}}

Output in JSON format:
{
  "isRecognized": <true|false>,
  "attendanceMarked": <true|false>,
  "activityLogged": <true|false>,
  "confidenceLevel": <numerical value>
}
`,
});

const verifyTeacherAttendanceFlow = ai.defineFlow(
  {
    name: 'verifyTeacherAttendanceFlow',
    inputSchema: VerifyTeacherAttendanceInputSchema,
    outputSchema: VerifyTeacherAttendanceOutputSchema,
  },
  async input => {
    const {output} = await verifyTeacherAttendancePrompt(input);
    return output!;
  }
);
