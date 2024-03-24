import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

 

  @Get('list')
  findAll() {
    return this.categoriesService.findAll();
  }
   @Post("addCategory")
  create(@Body() body: any) {

    const result = this.categoriesService.create(body);
     return {
      message:"Thêm thành công",
      result
  }
  }
   @Put('edit/:id')
 async update(@Param('id') id: string, @Body() updateProductDto: any,@Res() res) {
    
    try {
      await  this.categoriesService.update(+id, updateProductDto);
      return res.status(201).json({
        message: "Cập nhật thành công"
      })
    } catch (error) {
      return res.status(400).json({
        message: "Cập nhật thất bại"
      })
    }
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    const result= this.categoriesService.remove(+id);
    return {
      message: 'Xóa thành công',
      data: result
    }
  }
 
}
