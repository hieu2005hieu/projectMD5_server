import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>
 
   ) { }
 
  async getAllProducts() {
    let arr = await this.productRepository.find({
      relations: {category: true}
    })
    return arr
  }
  async getProduct(id: any) {
    const idProducts = await this.productRepository.findOneBy({ idProducts: id });
    // console.log(idProducts);
    return idProducts
  }
  async create(body: any) {
    const {product_id, ...rest} = body;
  const newData =   {
      ...rest,  
        category: rest.categoryId
    }
    const newProduct =  this.productRepository.create(newData as any);
     await this.productRepository.save(newProduct as any);
     return "Create successfully"
  }




  async update(id: number, updateProductDto: any) {
    await this.productRepository.createQueryBuilder()
    .update(ProductEntity).set({
      nameProducts: updateProductDto.nameProducts,
      price: updateProductDto.price,
      imgs : updateProductDto.imgs,
      description : updateProductDto.description,
      stock : updateProductDto.stock,
      category : updateProductDto.category.idCategory
    }).where({ idProducts: id }).execute();
    return `This action updates a #${id} product`;
  }


  async remove(id: number) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      return {
        message: 'Xóa thất bại',
      };
    } else {
      return {
        message: 'Xóa thành công',
      };
    }
  }
async searchProductsByName(name: string): Promise<ProductEntity[]> {
  return this.productRepository
    .createQueryBuilder('product')
    .innerJoinAndSelect('product.category', 'category')
    .where('product.nameProducts LIKE :name', { name: `%${name}%` })
    .getMany();
  }
}
