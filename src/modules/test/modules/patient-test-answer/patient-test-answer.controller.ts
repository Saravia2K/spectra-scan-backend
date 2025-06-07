import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { PatientTestAnswerService } from './patient-test-answer.service';
import { CreatePatientTestAnswerDto } from './dto/create-patient-test-answer.dto';
import { CreateSingleAnswerDto } from './dto/create-single-test-answer.dto';

@ApiTags('PatientTestAnswer')
@Controller('patient-test-answer')
export class PatientTestAnswerController {
  constructor(private readonly service: PatientTestAnswerService) {}

  @Post()
  @ApiOperation({ summary: 'Registrar respuestas a un test (en lote)' })
  @ApiBody({
    type: CreatePatientTestAnswerDto,
    examples: {
      default: {
        summary: 'Ejemplo de respuestas en lote',
        value: {
          patient_test_id: 1,
          answers: [
            { test_question_id: 1, value: 'DEFINITELY_AGREE' },
            { test_question_id: 2, value: 'SLIGHTLY_DISAGREE' },
            { test_question_id: 3, value: 'DEFINITELY_DISAGREE' },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Respuestas creadas correctamente',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  create(@Body() dto: CreatePatientTestAnswerDto) {
    return this.service.createMany(dto);
  }

  @Post('single')
  @ApiOperation({ summary: 'Registrar una sola respuesta de test' })
  @ApiBody({
    type: CreateSingleAnswerDto,
    examples: {
      default: {
        summary: 'Ejemplo',
        value: {
          patient_test_id: 1,
          test_question_id: 3,
          value: 'DEFINITELY_DISAGREE',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Respuesta registrada',
  })
  createOne(@Body() dto: CreateSingleAnswerDto) {
    return this.service.createOne(dto);
  }
}
