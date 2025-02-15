import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { IsCnpjValid } from '../utils/IsCnpjValidConstraint';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty({ message: "O campo 'name' não pode estar vazio." })
  readonly name: string;

  @IsString()
  @IsNotEmpty({ message: "O campo 'cnpj' não pode estar vazio." })
  @IsCnpjValid({ message: 'O CNPJ informado é inválido.' })
  readonly cnpj: string;

  @IsString()
  @IsNotEmpty({ message: "O campo 'userId' não pode estar vazio." })
  readonly create_id: string;

  @IsBoolean()
  @IsOptional()
  readonly isBlocked?: boolean;
}
