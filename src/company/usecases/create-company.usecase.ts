import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { CompanyDto } from '../dto/company.dto';

@Injectable()
export class CreateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(data: CreateCompanyDto, userId: string): Promise<CompanyDto> {
    return this.companyRepository.createCompany(data, userId);
  }
}
