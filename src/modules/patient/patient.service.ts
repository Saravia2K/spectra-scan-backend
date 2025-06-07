import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma-service/prisma-service.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePatientDto) {
    const { tutor, ...patientData } = data;

    const createdPatient = await this.prisma.patient.create({
      data: {
        ...patientData,
        registration_date: new Date(),
      },
    });

    if (tutor) {
      await this.prisma.tutor.create({
        data: {
          ...tutor,
          patient_id: createdPatient.id,
        },
      });
    }

    return createdPatient;
  }

  findAll() {
    return this.prisma.patient.findMany({
      include: { tutors: true },
    });
  }

  async findOne(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: { tutors: true },
    });
    if (!patient) throw new NotFoundException('Paciente no encontrado');
    return patient;
  }

  async update(id: number, data: UpdatePatientDto) {
    return this.prisma.patient.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Verificación
    await this.prisma.tutor.deleteMany({ where: { patient_id: id } });
    await this.prisma.patient.delete({ where: { id } });
    return { message: `Paciente ${id} eliminado correctamente` };
  }
}
