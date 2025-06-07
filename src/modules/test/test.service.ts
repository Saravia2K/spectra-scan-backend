import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma-service/prisma-service.service';
import { CreateTestDto } from './dto/create-test.dto';
import { CreatePatientTestDto } from './dto/create-patient-test.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TestService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTests() {
    return this.prisma.test.findMany();
  }

  async createTest(data: CreateTestDto) {
    return this.prisma.test.create({ data });
  }

  async createPatientTest(data: CreatePatientTestDto) {
    const token = uuidv4();
    const access_code = Math.floor(10000 + Math.random() * 90000).toString(); // 5 dígitos

    return this.prisma.patientTest.create({
      data: {
        ...data,
        token,
        access_code,
        total_score: null,
        details: null,
      },
    });
  }

  async validateTokenAndCode(token: string, access_code: string) {
    const result = await this.prisma.patientTest.findFirst({
      where: { token, access_code },
    });

    if (!result) throw new NotFoundException('Token o código incorrecto');
    return { message: 'Acceso válido', test_id: result.test_id };
  }

  async finishTest(patient_test_id: number) {
    const patientTest = await this.prisma.patientTest.findUnique({
      where: { id: patient_test_id },
      include: {
        answers: true,
        test: {
          include: {
            questions: true,
          },
        },
      },
    });

    if (!patientTest) throw new NotFoundException('Test no encontrado');

    const answers = patientTest.answers;
    const questions = patientTest.test.questions;

    // Mapeo de preguntas por ID
    const questionMap = new Map(questions.map((q) => [q.id, q]));

    let total_score = 0;
    const categoryTotals: Record<string, number> = {};

    for (const answer of answers) {
      const question = questionMap.get(answer.test_question_id);
      if (!question) continue;

      const scorableValues: string[] = question.scorable_values as any;

      const category = question.category_id.toString();

      if (scorableValues.includes(answer.value)) {
        total_score++;

        // Totales por categoría
        if (!categoryTotals[category]) categoryTotals[category] = 0;
        categoryTotals[category]++;
      }
    }

    await this.prisma.patientTest.update({
      where: { id: patient_test_id },
      data: {
        total_score,
        details: categoryTotals,
      },
    });

    return {
      message: 'Test finalizado',
      total_score,
      details: categoryTotals,
    };
  }

  getQuestionsByTest(test_id: number) {
    return this.prisma.testQuestion.findMany({
      where: { test_id },
      include: { category: true },
    });
  }
}
