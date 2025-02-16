import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty({ message: "O campo 'codigo' não pode estar vazio." })
  readonly code: string;

  @IsString()
  @IsNotEmpty({ message: "O campo 'descrição' não pode estar vazio." })
  readonly description: string;

  @IsString()
  @IsOptional()
  readonly category?: string;

  @IsString()
  @IsOptional()
  readonly company_id?: string;

  @IsString()
  @IsNotEmpty({ message: "O campo 'userId' não pode estar vazio." })
  readonly create_id: string;

  @IsNumber()
  @IsOptional()
  readonly weight?: number;

  @IsBoolean()
  @IsOptional()
  readonly isBlocked?: boolean;
}
