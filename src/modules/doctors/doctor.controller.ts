// src/doctor/doctor.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto, UpdateDoctorDto } from './dto/doctor.dto';
import { Doctor } from 'generated/prisma';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { DoctorEntity } from './entities/doctor.entity';

@ApiTags('Doctor')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los doctores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de doctores',
    type: [DoctorEntity],
  })
  findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un doctor por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Doctor encontrado',
    type: DoctorEntity,
  })
  findOne(@Param('id') id: string): Promise<Doctor> {
    return this.doctorService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo doctor' })
  @ApiResponse({
    status: 201,
    description: 'Doctor creado exitosamente',
    type: DoctorEntity,
  })
  @ApiBody({
    type: CreateDoctorDto,
    examples: {
      default: {
        summary: 'Ejemplo de creación de doctor',
        value: {
          names: 'Ana',
          last_names: 'Ramírez',
          email: 'ana.ramirez@hospital.com',
          password: 'Segura123',
        },
      },
    },
  })
  create(@Body() data: CreateDoctorDto): Promise<Doctor> {
    return this.doctorService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar información de un doctor' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID del doctor a actualizar',
  })
  @ApiResponse({
    status: 200,
    description: 'Doctor actualizado exitosamente',
  })
  @ApiBody({
    type: UpdateDoctorDto,
    examples: {
      default: {
        summary: 'Ejemplo de actualización',
        value: {
          names: 'Ana Beatriz',
          email: 'ana.beatriz@hospital.com',
          password: 'NuevaClave456',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() data: UpdateDoctorDto,
  ): Promise<Doctor> {
    return this.doctorService.update(+id, data);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Inicio de sesión de doctor' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'doctor@mail.com' },
        password: { type: 'string', example: 'secret123' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        doctor: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            names: { type: 'string' },
            last_names: { type: 'string' },
            email: { type: 'string' },
          },
        },
      },
    },
  })
  login(
    @Body() body: { email: string; password: string },
  ): ReturnType<typeof this.doctorService.login> {
    return this.doctorService.login(body.email, body.password);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un doctor por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Doctor eliminado correctamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.doctorService.remove(+id);
  }
}
