import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/items.repository';
import { UpdateCompanyDto } from '../dto/update-items.dto';

@Injectable()
export class UpdateCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: number, data: UpdateCompanyDto) {
    return this.companyRepository.updateCompany(id, data);
  }
}
