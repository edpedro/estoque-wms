import { CompanyDto } from '../dto/company.dto';
import { CompanyRepository } from '../repositories/company.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(): Promise<CompanyDto[]> {
    return this.companyRepository.findAllCompnay();
  }
}
