import { Injectable } from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';
import { AddressDto } from '../dto/address.dto';
import { CreateAddressDto } from '../dto/create-address.dto';

@Injectable()
export class CreateAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(data: CreateAddressDto, idUser: string): Promise<AddressDto> {
    return this.addressRepository.createAddress(data, idUser);
  }
}
