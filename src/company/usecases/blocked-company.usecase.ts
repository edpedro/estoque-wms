import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@Injectable()
export class BlockedCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: number, data: UpdateCompanyDto) {
    return this.companyRepository.blockedCompany(id, data);
  }
}
