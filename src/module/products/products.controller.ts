import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, Res } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';

@Controller('api/v1/product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

 
  @Get('search')
  async searchProducts(@Query('key') name: string): Promise<ProductEntity[]> {
    
    return this.productsService.searchProductsByName(name);
  }
  @Get('list')
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }
  @Get(':id')
  async getProduct(@Param('id') id: any) {
    return this.productsService.getProduct(id);
  }
  @Post("addProduct")
  create(@Body() body: any) {
    const result = this.productsService.create(body);
     return {
      message:"Thêm thành công",
      result
  }
  }
 @Put('edit/:id')
 async update(@Param('id') id: string, @Body() updateProductDto: any,@Res() res) {
    
    try {
      await  this.productsService.update(+id, updateProductDto);
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
    return this.productsService.remove(+id);
  }

}
