import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';
import { CompanyDto } from '../dto/company.dto';

@Injectable()
export class ListCompanyIdUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: number): Promise<CompanyDto | null> {
    return this.companyRepository.findById(id);
  }
}
