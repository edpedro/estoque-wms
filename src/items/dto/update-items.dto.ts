import { PartialType } from '@nestjs/mapped-types';
import { CreateCompanyDto } from './create-items.dto';

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
