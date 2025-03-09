import { Injectable } from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';
import { AddressDto } from '../dto/address.dto';

@Injectable()
export class ListAddressNameUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(name: string): Promise<AddressDto | null> {
    return this.addressRepository.findByName(name);
  }
}
