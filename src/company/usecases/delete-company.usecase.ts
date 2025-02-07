import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';

@Injectable()
export class DeleteCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: number) {
    return this.companyRepository.removeCompany(id);
  }
}
