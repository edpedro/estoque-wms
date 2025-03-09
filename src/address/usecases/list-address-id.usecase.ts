import { Injectable } from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';
import { AddressDto } from '../dto/address.dto';

@Injectable()
export class ListAddressIdUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(id: number): Promise<AddressDto | null> {
    return this.addressRepository.findById(id);
  }
}
