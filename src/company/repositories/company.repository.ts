import { cnpj } from 'cpf-cnpj-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { CompanyDto } from '../dto/company.dto';

@Injectable()
export class CompanyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createCompany(data: CreateCompanyDto) {
    return await this.prisma.company.create({
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

  async findById(id: number) {
    return await this.prisma.company.findUnique({
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
    return await this.prisma.company.findUnique({
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
    return await this.prisma.company.findMany({
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
    return await this.prisma.company.update({
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
    return await this.prisma.company.delete({
      where: { id },
    });
  }
}
