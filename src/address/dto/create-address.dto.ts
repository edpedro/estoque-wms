import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateAddressDto {
  @IsNumber({}, { message: "O campo 'companyId' deve ser um número válido." })
  @IsNotEmpty({ message: "O campo 'companyId' não pode estar vazio." })
  readonly companyId: number;

  @IsString()
  @IsNotEmpty({ message: "O campo 'name' não pode estar vazio." })
  readonly name: string;

  @IsBoolean()
  @IsOptional()
  readonly isBlocked?: boolean;

  @IsNumber({}, { message: "O campo 'capacity' deve ser um número válido." })
  readonly capacity: number;
}
