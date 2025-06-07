import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma-service/prisma-service.service';
import { CreateTestQuestionDto } from './dto/create-test-question.dto';
import { UpdateTestQuestionDto } from './dto/update-test-question.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class TestQuestionService {
  constructor(private readonly prisma: PrismaService) {}

  createQuestion(data: CreateTestQuestionDto) {
    return this.prisma.testQuestion.create({ data });
  }

  updateQuestion(id: number, data: UpdateTestQuestionDto) {
    return this.prisma.testQuestion.update({ where: { id }, data });
  }

  createCategory(data: CreateCategoryDto) {
    return this.prisma.testAnswerCategory.create({ data });
  }

  updateCategory(id: number, data: UpdateCategoryDto) {
    return this.prisma.testAnswerCategory.update({ where: { id }, data });
  }

  async getAllCategories() {
    return this.prisma.testAnswerCategory.findMany({ orderBy: { id: 'asc' } });
  }

  async deleteCategory(id: number) {
    return this.prisma.testAnswerCategory.delete({
      where: { id },
    });
  }

  async getCategoryById(id: number) {
    const category = await this.prisma.testAnswerCategory.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException('Categoría no encontrada');
    }

    return category;
  }
}
