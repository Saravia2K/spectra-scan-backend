import { TestAnswerValues } from 'generated/prisma';

export class CreateSingleAnswerDto {
  patient_test_id: number;
  test_question_id: number;
  value: TestAnswerValues;
}
