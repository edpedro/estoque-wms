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
import { CategoryService } from '../service/category.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ReqUserDto } from 'src/auth/dto/req-user.dto';

@Controller('category')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles('category_create')
  create(@Body() createCategoryDto: CreateCategoryDto, @Req() req: ReqUserDto) {
    return this.categoryService.create(createCategoryDto, req);
  }

  @Get()
  @Roles('category_read')
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @Roles('category_read')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @Roles('category_update')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles('category_delete')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
