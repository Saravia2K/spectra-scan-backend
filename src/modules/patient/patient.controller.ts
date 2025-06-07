import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@ApiTags('Patient')
@Controller('patient')
export class PatientController {
  constructor(private readonly service: PatientService) {}

  @Post()
  @ApiOperation({ summary: 'Crear paciente (con tutor opcional)' })
  @ApiBody({
    type: CreatePatientDto,
    examples: {
      withTutor: {
        summary: 'Con tutor',
        value: {
          doctor_id: 1,
          names: 'Carlos',
          last_names: 'Martínez',
          age: 5,
          tutor: {
            names: 'Laura',
            last_names: 'Martínez',
            email: 'laura@mail.com',
            relationship: 'Madre',
          },
        },
      },
      noTutor: {
        summary: 'Sin tutor',
        value: {
          doctor_id: 1,
          names: 'Carlos',
          last_names: 'Martínez',
          age: 5,
        },
      },
    },
  })
  create(@Body() data: CreatePatientDto) {
    return this.service.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los pacientes' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un paciente por ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un paciente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    type: UpdatePatientDto,
    examples: {
      update: {
        summary: 'Ejemplo de actualización',
        value: {
          names: 'Carlos Andrés',
          age: 6,
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() data: UpdatePatientDto) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un paciente y su tutor' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
