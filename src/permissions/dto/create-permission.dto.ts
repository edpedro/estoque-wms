import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty({ message: "O campo 'name' não pode estar vazio." })
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsNotEmpty({ message: "O campo 'userId' não pode estar vazio." })
  readonly create_id: string;
}
