import { CompanyDto } from '../dto/items.dto';
import { CompanyRepository } from '../repositories/items.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ListCompanyUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(): Promise<CompanyDto[]> {
    return this.companyRepository.findAllCompnay();
  }
}
