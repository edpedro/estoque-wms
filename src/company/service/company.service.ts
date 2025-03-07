import { CacheService } from './../../cache/cache.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyUseCase } from '../usecases/create-company.usecase';
import { ListCompanyUseCase } from '../usecases/list-company.usecase';
import { ListCompanyIdUseCase } from '../usecases/list-company-id.usecase';
import { UpdateCompanyUseCase } from '../usecases/update-company.usecase';
import { DeleteCompanyUseCase } from '../usecases/delete-company.usecase';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { ListCompanyCNPJUseCase } from '../usecases/list-company-cnpj.usecase';
import { cnpj } from 'cpf-cnpj-validator';
import { BlockedCompanyUseCase } from '../usecases/blocked-company.usecase';
import { UserDto } from 'src/users/dto/user.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Injectable()
export class CompanyService {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly listCompanyUseCase: ListCompanyUseCase,
    private readonly listCompanyIdUseCase: ListCompanyIdUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
    private readonly listCompanyCNPJUseCase: ListCompanyCNPJUseCase,
    private readonly blockedCompanyUseCase: BlockedCompanyUseCase,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, req: ReqUserDto) {
    if (req.user.role !== 'admin') {
      throw new HttpException(
        'Usuario não pode cadastrar empresa',
        HttpStatus.NOT_FOUND,
      );
    }

    if (!cnpj.isValid(createCompanyDto.cnpj)) {
      throw new Error('CNPJ inválido');
    }

    const companyExist = await this.listCompanyCNPJUseCase.execute(
      createCompanyDto.cnpj,
    );
    if (companyExist) {
      throw new HttpException('CNPJ já cadastrado', HttpStatus.NOT_FOUND);
    }

    try {
      const company = await this.createCompanyUseCase.execute(
        createCompanyDto,
        req.user.id,
      );

      return company;
    } catch (error) {
      throw new HttpException('Empresa não cadastrada', HttpStatus.NOT_FOUND);
    }
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

  async blocked(id: number, data: UpdateCompanyDto, req: ReqUserDto) {
    const companyExist = await this.listCompanyIdUseCase.execute(id);
    if (!companyExist) {
      throw new HttpException('Empresa não encontrada', HttpStatus.NOT_FOUND);
    }

    try {
      const blockedCompany = await this.blockedCompanyUseCase.execute(id, data);

      return blockedCompany;
    } catch (error) {
      console.error(error);
      throw new HttpException('Bloqueo não atualizado', HttpStatus.BAD_REQUEST);
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
