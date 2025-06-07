import { TestAnswerValues } from 'generated/prisma';

export class CreatePatientTestAnswerDto {
  patient_test_id: number;
  answers: {
    test_question_id: number;
    value: TestAnswerValues;
  }[];
}
