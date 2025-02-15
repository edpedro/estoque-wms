import { cnpj } from 'cpf-cnpj-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from '../dto/create-items.dto';
import { UpdateCompanyDto } from '../dto/update-items.dto';
import { CompanyDto } from '../dto/items.dto';

@Injectable()
export class ItemsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createItems(data: CreateCompanyDto) {
    return await this.prisma.item.create({
      data,
      select: {
        id: true,
        isBlocked: true,
        create_id: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findById(id: number) {
    return await this.prisma.item.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        cnpj: true,
        isBlocked: true,
        create_id: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findByCNPJ(cnpj: string) {
    return await this.prisma.item.findUnique({
      where: { cnpj },
      select: {
        id: true,
        name: true,
        cnpj: true,
        isBlocked: true,
        create_id: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findAllCompnay(): Promise<CompanyDto[]> {
    return await this.prisma.item.findMany({
      select: {
        id: true,
        name: true,
        cnpj: true,
        isBlocked: true,
        create_id: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async updateCompany(id: number, data: UpdateCompanyDto) {
    return await this.prisma.item.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        cnpj: true,
        isBlocked: true,
        create_id: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async removeCompany(id: number) {
    return await this.prisma.item.delete({
      where: { id },
    });
  }
}
