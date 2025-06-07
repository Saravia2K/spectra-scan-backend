import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { CreatePatientTestDto } from './dto/create-patient-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los tests' })
  @ApiResponse({ status: 200, description: 'Lista de tests' })
  getAll() {
    return this.testService.getAllTests();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un solo test por ID con sus preguntas' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Test encontrado con preguntas' })
  getOne(@Param('id') id: string) {
    return this.testService.getTestById(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo test' })
  @ApiBody({
    type: CreateTestDto,
    examples: {
      default: {
        summary: 'Ejemplo de creación de test',
        value: {
          name: 'Test de Comunicación',
          description: 'Evaluación de patrones comunicativos',
          cutoff: 12,
        },
      },
    },
  })
  create(@Body() data: CreateTestDto) {
    return this.testService.createTest(data);
  }

  @Post('assign')
  @ApiOperation({ summary: 'Asignar test a un paciente (PatientTest)' })
  @ApiBody({
    type: CreatePatientTestDto,
    examples: {
      default: {
        summary: 'Ejemplo de asignación',
        value: {
          patient_id: 3,
          test_id: 1,
        },
      },
    },
  })
  createAssignment(@Body() data: CreatePatientTestDto) {
    return this.testService.createPatientTest(data);
  }

  @Post('validate')
  @ApiOperation({ summary: 'Validar token y código de acceso' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: '123e4567-e89b-12d3-a456-426614174000',
        },
        access_code: { type: 'string', example: '83627' },
      },
      required: ['token', 'access_code'],
    },
  })
  validate(@Body() body: { token: string; access_code: string }) {
    return this.testService.validateTokenAndCode(body.token, body.access_code);
  }

  @Post('finish/:id')
  @ApiOperation({ summary: 'Finalizar test, calcular score y detalles' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de PatientTest' })
  @ApiResponse({
    status: 200,
    description: 'Test finalizado con éxito',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        total_score: { type: 'number' },
        details: {
          type: 'object',
          additionalProperties: { type: 'number' },
        },
      },
    },
  })
  finish(@Param('id') id: string) {
    return this.testService.finishTest(+id);
  }

  @Get(':id/questions')
  @ApiOperation({ summary: 'Obtener todas las preguntas de un test' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del test' })
  @ApiResponse({
    status: 200,
    description: 'Lista de preguntas con categoría',
  })
  getTestQuestions(@Param('id') id: string) {
    return this.testService.getQuestionsByTest(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un test por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    type: UpdateTestDto,
    examples: {
      default: {
        summary: 'Ejemplo de actualización',
        value: {
          name: 'Test de Motricidad Actualizado',
          description: 'Versión revisada del test de motricidad',
          cutoff: 10,
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Test actualizado correctamente' })
  updateTest(@Param('id') id: string, @Body() data: UpdateTestDto) {
    return this.testService.updateTest(+id, data);
  }
}
