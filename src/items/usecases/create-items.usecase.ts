import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/items.repository';
import { CreateCompanyDto } from '../dto/create-items.dto';
import { CompanyDto } from '../dto/items.dto';

@Injectable()
export class CreateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(data: CreateCompanyDto): Promise<CompanyDto> {
    return this.companyRepository.createCompany(data);
  }
}
