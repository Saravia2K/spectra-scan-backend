import { TestAnswerValues } from 'generated/prisma';

export class CreateTestQuestionDto {
  test_id: number;
  category_id: number;
  text: string;
  scorable_values: TestAnswerValues[];
}
