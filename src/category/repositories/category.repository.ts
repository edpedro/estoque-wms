import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoryDto } from '../dto/category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(data: CreateCategoryDto, idUser: string) {
    return await this.prisma.category.create({
      data: {
        ...data,
        createId: idUser,
      },
      select: {
        id: true,
        name: true,
        createId: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });
  }

  async findById(id: number): Promise<CategoryDto | null> {
    return await this.prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        createId: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });
  }

  async findByName(nameCategory: string) {
    return await this.prisma.category.findFirst({
      where: {
        name: nameCategory,
      },
      select: {
        id: true,
        name: true,
        createId: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });
  }

  async findAllCategory(): Promise<CategoryDto[]> {
    return await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        createId: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });
  }

  async updateCategory(id: number, data: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        createId: true,
        created_at: true,
        updated_at: true,
        company: {
          select: {
            id: true,
            name: true,
            cnpj: true,
            isBlocked: true,
          },
        },
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
            role: true,
          },
        },
      },
    });
  }

  async removeCategory(id: number) {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
