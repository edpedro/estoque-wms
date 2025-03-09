import { Injectable } from '@nestjs/common';
import { AddressRepository } from '../repositories/address.repository';
import { UpdateAddressDto } from '../dto/update-address.dto';

@Injectable()
export class UpdateAddressUseCase {
  constructor(private readonly addressRepository: AddressRepository) {}

  async execute(id: number, data: UpdateAddressDto) {
    return this.addressRepository.updateAddress(id, data);
  }
}
