import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/items.repository';

@Injectable()
export class DeleteCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: number) {
    return this.companyRepository.removeCompany(id);
  }
}
