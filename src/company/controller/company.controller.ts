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
import { CompanyService } from '../service/company.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Controller('company')
@UseGuards(AuthGuard('jwt'))
export class CampanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Roles('company_create')
  create(@Body() createCompanyDto: CreateCompanyDto, @Req() req: ReqUserDto) {
    return this.companyService.create(createCompanyDto, req);
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

  @Patch('blocked/:id')
  @Roles('company_blocked')
  blocked(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Req() req: ReqUserDto,
  ) {
    return this.companyService.blocked(+id, updateCompanyDto, req);
  }

  @Delete(':id')
  @Roles('company_delete')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
