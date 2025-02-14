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
import { CompanyService } from '../service/company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('company')
@UseGuards(AuthGuard('jwt'))
export class CampanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Roles('company_create')
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @Roles('company_read')
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @Roles('company_read')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  @Roles('company_update')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @Roles('company_delete')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
