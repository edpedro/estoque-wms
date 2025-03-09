import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AddressService } from '../service/address.service';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Controller('address')
@UseGuards(AuthGuard('jwt'))
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @Roles('address_create')
  create(@Body() createAddressDto: CreateAddressDto, @Req() req: ReqUserDto) {
    return this.addressService.create(createAddressDto, req);
  }

  @Get()
  @Roles('address_read')
  findAll() {
    return this.addressService.findAll();
  }

  @Get(':id')
  @Roles('address_read')
  findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Patch(':id')
  @Roles('address_update')
  update(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  @Roles('address_delete')
  remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }

  @Patch('blocked/:id')
  @Roles('address_blocked')
  blocked(@Param('id') id: string, @Body() updateAddressDto: UpdateAddressDto) {
    return this.addressService.updateBlocked(+id, updateAddressDto);
  }
}
