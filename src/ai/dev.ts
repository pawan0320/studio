import { config } from 'dotenv';
config();

import '@/ai/flows/generate-lesson-materials.ts';
import '@/ai/flows/generate-student-reports.ts';
import '@/ai/flows/create-interactive-content.ts';
import '@/ai/flows/verify-teacher-attendance.ts';
import '@/ai/flows/divide-students-into-groups.ts';
import '@/ai/flows/analyze-student-performance.ts';