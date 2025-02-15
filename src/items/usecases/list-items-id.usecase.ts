import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/items.repository';
import { CompanyDto } from '../dto/items.dto';

@Injectable()
export class ListCompanyIdUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(id: number): Promise<CompanyDto | null> {
    return this.companyRepository.findById(id);
  }
}
