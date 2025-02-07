import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';
import { CompanyDto } from '../dto/company.dto';

@Injectable()
export class ListCompanyCNPJUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(cnpj: string): Promise<CompanyDto | null> {
    return this.companyRepository.findByCNPJ(cnpj);
  }
}
