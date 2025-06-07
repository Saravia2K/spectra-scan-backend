import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { TestQuestionService } from './test-question.service';
import { CreateTestQuestionDto } from './dto/create-test-question.dto';
import { UpdateTestQuestionDto } from './dto/update-test-question.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('TestQuestion')
@Controller('test-question')
export class TestQuestionController {
  constructor(private readonly service: TestQuestionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva pregunta para un test' })
  @ApiBody({
    type: CreateTestQuestionDto,
    examples: {
      default: {
        summary: 'Ejemplo',
        value: {
          test_id: 1,
          category_id: 2,
          text: '¿El niño responde cuando lo llaman?',
          scorable_values: ['DEFINITELY_AGREE', 'SLIGHTLY_AGREE'],
        },
      },
    },
  })
  create(@Body() dto: CreateTestQuestionDto) {
    return this.service.createQuestion(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una pregunta' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    type: UpdateTestQuestionDto,
    examples: {
      default: {
        summary: 'Actualizar texto y puntaje',
        value: {
          text: '¿El niño mantiene contacto visual?',
          scorable_values: ['DEFINITELY_AGREE'],
        },
      },
    },
  })
  update(@Param('id') id: string, @Body() dto: UpdateTestQuestionDto) {
    return this.service.updateQuestion(+id, dto);
  }

  @Post('category')
  @ApiOperation({ summary: 'Crear una categoría' })
  @ApiBody({
    type: CreateCategoryDto,
    examples: {
      default: {
        summary: 'Ejemplo',
        value: {
          name: 'Motricidad Fina',
        },
      },
    },
  })
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.service.createCategory(dto);
  }

  @Patch('category/:id')
  @ApiOperation({ summary: 'Actualizar categoría' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({
    type: UpdateCategoryDto,
    examples: {
      default: {
        summary: 'Nuevo nombre',
        value: {
          name: 'Lenguaje y Comunicación',
        },
      },
    },
  })
  updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.service.updateCategory(+id, dto);
  }

  @Get('category')
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  @ApiResponse({ status: 200, description: 'Lista de categorías' })
  getAllCategories() {
    return this.service.getAllCategories();
  }

  @Delete('category/:id')
  @ApiOperation({ summary: 'Eliminar una categoría por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Categoría eliminada correctamente',
  })
  deleteCategory(@Param('id') id: string) {
    return this.service.deleteCategory(+id);
  }

  @Get('category/:id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Categoría encontrada' })
  getCategoryById(@Param('id') id: string) {
    return this.service.getCategoryById(+id);
  }
}
