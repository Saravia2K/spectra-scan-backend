import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma-service/prisma-service.service';
import { CreatePatientTestAnswerDto } from './dto/create-patient-test-answer.dto';
import { CreateSingleAnswerDto } from './dto/create-single-test-answer.dto';

@Injectable()
export class PatientTestAnswerService {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(dto: CreatePatientTestAnswerDto) {
    const { patient_test_id, answers } = dto;

    const testExists = await this.prisma.patientTest.findUnique({
      where: { id: patient_test_id },
    });
    if (!testExists) throw new NotFoundException('PatientTest no encontrado');

    await this.prisma.patientTestAnswer.createMany({
      data: answers.map((a) => ({
        patient_test_id,
        test_question_id: a.test_question_id,
        value: a.value,
      })),
    });

    return { message: 'Respuestas registradas correctamente' };
  }

  async createOne(dto: CreateSingleAnswerDto) {
    const { patient_test_id, test_question_id, value } = dto;

    const exists = await this.prisma.patientTest.findUnique({
      where: { id: patient_test_id },
    });
    if (!exists) throw new NotFoundException('PatientTest no encontrado');

    return this.prisma.patientTestAnswer.create({
      data: {
        patient_test_id,
        test_question_id,
        value,
      },
    });
  }
}
