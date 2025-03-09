import { CreateAddressUseCase } from './../usecases/create-address.usecase';
import { ListCompanyIdUseCase } from './../../company/usecases/list-company-id.usecase';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';
import { ListAddressNameUseCase } from '../usecases/list-address-name.usecase';
import { ListAddressUseCase } from '../usecases/list-address.usecase';
import { ListAddressIdUseCase } from '../usecases/list-address-id.usecase';
import { UpdateAddressUseCase } from '../usecases/update-address.usecase';
import { BlockedAddressUseCase } from '../usecases/blocked-address.usecase';

@Injectable()
export class AddressService {
  constructor(
    private readonly listCompanyIdUseCase: ListCompanyIdUseCase,
    private readonly listAddressNameUseCase: ListAddressNameUseCase,
    private readonly createAddressUseCase: CreateAddressUseCase,
    private readonly listAddressUseCase: ListAddressUseCase,
    private readonly listAddressIdUseCase: ListAddressIdUseCase,
    private readonly updateAddressUseCase: UpdateAddressUseCase,
    private readonly blockedAddressUseCase: BlockedAddressUseCase,
  ) {}

  async create(createAddressDto: CreateAddressDto, req: ReqUserDto) {
    if (createAddressDto.companyId) {
      const companyExits = await this.listCompanyIdUseCase.execute(
        createAddressDto.companyId,
      );

      if (!companyExits) {
        throw new HttpException('Empresa não cadastrada', HttpStatus.NOT_FOUND);
      }

      if (companyExits?.isBlocked) {
        throw new HttpException('Empresa inativa', HttpStatus.NOT_FOUND);
      }
    }

    const categoryExits = await this.listAddressNameUseCase.execute(
      createAddressDto.name,
    );
    if (categoryExits) {
      throw new HttpException('Endereço já cadastrado', HttpStatus.NOT_FOUND);
    }

    try {
      const address = await this.createAddressUseCase.execute(
        createAddressDto,
        req.user.id,
      );

      return address;
    } catch (error) {
      throw new HttpException('Endereço não cadastrado', HttpStatus.NOT_FOUND);
    }
  }

  async findAll() {
    return await this.listAddressUseCase.execute();
  }

  async findOne(id: number) {
    const address = await this.listAddressIdUseCase.execute(id);

    if (!address) {
      throw new HttpException('Endereço não encontrada', HttpStatus.NOT_FOUND);
    }

    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    if (updateAddressDto.companyId) {
      const companyExits = await this.listCompanyIdUseCase.execute(
        updateAddressDto.companyId,
      );

      if (!companyExits) {
        throw new HttpException('Empresa não cadastrada', HttpStatus.NOT_FOUND);
      }

      if (companyExits?.isBlocked) {
        throw new HttpException('Empresa inativa', HttpStatus.NOT_FOUND);
      }
    }

    const addressExist = await this.listAddressIdUseCase.execute(id);

    if (!addressExist) {
      throw new HttpException('Endereço não encontrada', HttpStatus.NOT_FOUND);
    }

    try {
      const updateAddress = await this.updateAddressUseCase.execute(
        id,
        updateAddressDto,
      );

      return updateAddress;
    } catch (error) {
      throw new HttpException('Endereço não atualizado', HttpStatus.NOT_FOUND);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }

  async updateBlocked(id: number, updateAddressDto: UpdateAddressDto) {
    const addressExist = await this.listAddressIdUseCase.execute(id);

    if (!addressExist) {
      throw new HttpException('Endereço não encontrada', HttpStatus.NOT_FOUND);
    }

    try {
      const updatedItem = await this.blockedAddressUseCase.execute(
        id,
        updateAddressDto,
      );
      return updatedItem;
    } catch (error) {
      throw new HttpException('Endereço não bloqueado', HttpStatus.BAD_REQUEST);
    }
  }
}
