import { Injectable } from '@nestjs/common';
import { CompanyRepository } from '../repositories/items.repository';
import { CompanyDto } from '../dto/items.dto';

@Injectable()
export class ListCompanyCNPJUseCase {
  constructor(private readonly companyRepository: CompanyRepository) {}

  async execute(cnpj: string): Promise<CompanyDto | null> {
    return this.companyRepository.findByCNPJ(cnpj);
  }
}
