import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyUseCase } from '../usecases/create-items.usecase';
import { ListCompanyUseCase } from '../usecases/list-items.usecase';
import { ListCompanyIdUseCase } from '../usecases/list-items-id.usecase';
import { UpdateCompanyUseCase } from '../usecases/update-items.usecase';
import { DeleteCompanyUseCase } from '../usecases/delete-items.usecase';
import { CreateCompanyDto } from '../dto/create-items.dto';
import { UpdateCompanyDto } from '../dto/update-items.dto';
import { ListCompanyCNPJUseCase } from '../usecases/list-items-cnpj.usecase';
import { cnpj } from 'cpf-cnpj-validator';

@Injectable()
export class CompanyService {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly listCompanyUseCase: ListCompanyUseCase,
    private readonly listCompanyIdUseCase: ListCompanyIdUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
    private readonly listCompanyCNPJUseCase: ListCompanyCNPJUseCase,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    if (!cnpj.isValid(createCompanyDto.cnpj)) {
      throw new Error('CNPJ inválido');
    }

    const companyExist = await this.listCompanyCNPJUseCase.execute(
      createCompanyDto.cnpj,
    );
    if (companyExist) {
      throw new HttpException('CNPJ já cadastrado', HttpStatus.NOT_FOUND);
    }

    const company = await this.createCompanyUseCase.execute(createCompanyDto);

    return company;
  }

  async findAll() {
    return await this.listCompanyUseCase.execute();
  }

  async findOne(id: number) {
    const company = await this.listCompanyIdUseCase.execute(id);
    if (!company) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }
    return company;
  }

  async update(id: number, data: UpdateCompanyDto) {
    const companyExist = await this.listCompanyIdUseCase.execute(id);
    if (!companyExist) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }

    try {
      const updatedCompany = await this.updateCompanyUseCase.execute(id, data);
      return updatedCompany;
    } catch (error) {
      console.error(error);
      throw new HttpException('Empresa não atualizada', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const companyExist = await this.listCompanyIdUseCase.execute(id);
    if (!companyExist) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }

    try {
      await this.deleteCompanyUseCase.execute(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Erro ao deletar Empresa',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
