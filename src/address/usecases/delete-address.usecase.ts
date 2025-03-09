import { Injectable } from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';

@Injectable()
export class DeleteAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(id: number) {
    return this.addressRepository.removeAddress(id);
  }
}
