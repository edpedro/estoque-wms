import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from '../service/items.service';
import { CreateCompanyDto } from '../dto/create-items.dto';
import { UpdateCompanyDto } from '../dto/update-items.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('items')
@UseGuards(AuthGuard('jwt'))
export class ItemsController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Roles('items_create')
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @Roles('items_read')
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @Roles('items_read')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  @Roles('items_update')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @Roles('items_delete')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
