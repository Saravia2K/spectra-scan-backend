// src/doctor/doctor.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../common/services/prisma-service/prisma-service.service';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/doctor.dto';
import { Doctor } from 'generated/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Doctor[]> {
    return this.prisma.doctor.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.prisma.doctor.findUnique({ where: { id } });
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  async create(data: CreateDoctorDto): Promise<Doctor> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return this.prisma.doctor.create({
      data: {
        names: data.names,
        last_names: data.last_names,
        email: data.email,
        password: hashedPassword,
        request_password_change: false,
        registration_date: new Date(),
      },
    });
  }

  async update(id: number, data: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.prisma.doctor.findUnique({ where: { id } });
    if (!doctor) throw new NotFoundException('Doctor not found');

    const updateData: Partial<Doctor> = {
      names: data.names ?? doctor.names,
      last_names: data.last_names ?? doctor.last_names,
      email: data.email ?? doctor.email,
    };

    if (data.password) {
      const hashed = await bcrypt.hash(data.password, 10);
      updateData.password = hashed;
      updateData.request_password_change = true;
    }

    return this.prisma.doctor.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // Verifica existencia
    await this.prisma.doctor.delete({ where: { id } });
    return { message: `Doctor ${id} eliminado correctamente` };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{
    message: string;
    doctor: Pick<Doctor, 'id' | 'names' | 'last_names' | 'email'>;
  }> {
    const doctor = await this.prisma.doctor.findUnique({ where: { email } });
    if (!doctor) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(password, doctor.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    return {
      message: 'Login successful',
      doctor: {
        id: doctor.id,
        names: doctor.names,
        last_names: doctor.last_names,
        email: doctor.email,
      },
    };
  }
}
