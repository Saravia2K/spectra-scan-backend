import { TestAnswerValues } from 'generated/prisma';

export class UpdateTestQuestionDto {
  text?: string;
  category_id?: number;
  scorable_values?: TestAnswerValues[];
}
