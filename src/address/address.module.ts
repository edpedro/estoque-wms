import { Module } from '@nestjs/common';
import { AddressService } from './service/address.service';
import { AddressController } from './controller/address.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddressRepository } from './repositories/address.repository';
import { BlockedAddressUseCase } from './usecases/blocked-address.usecase';
import { CreateAddressUseCase } from './usecases/create-address.usecase';
import { DeleteAddressUseCase } from './usecases/delete-address.usecase';
import { ListAddressIdUseCase } from './usecases/list-address-id.usecase';
import { ListAddressNameUseCase } from './usecases/list-address-name.usecase';
import { ListAddressUseCase } from './usecases/list-address.usecase';
import { UpdateAddressUseCase } from './usecases/update-address.usecase';
import { CompanyRepository } from 'src/company/repositories/company.repository';
import { ListCompanyIdUseCase } from 'src/company/usecases/list-company-id.usecase';

@Module({
  controllers: [AddressController],
  providers: [
    AddressService,
    PrismaService,
    AddressRepository,
    CompanyRepository,
    BlockedAddressUseCase,
    CreateAddressUseCase,
    DeleteAddressUseCase,
    ListAddressIdUseCase,
    ListAddressNameUseCase,
    ListAddressUseCase,
    UpdateAddressUseCase,
    ListCompanyIdUseCase,
  ],
})
export class AddressModule {}
