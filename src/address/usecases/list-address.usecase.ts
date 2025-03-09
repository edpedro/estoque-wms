import { Injectable } from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';
import { AddressDto } from '../dto/address.dto';

@Injectable()
export class ListAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(): Promise<AddressDto[]> {
    return this.addressRepository.findAllAddress();
  }
}
