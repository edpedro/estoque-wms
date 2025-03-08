import { IsString, IsNotEmpty, IsInt } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: "O campo 'name' não pode estar vazio." })
  readonly name: string;

  @IsInt()
  @IsNotEmpty({ message: "O campo 'companyid' não pode estar vazio." })
  readonly companyId: number;
}
