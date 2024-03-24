import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(@InjectRepository(CategoryEntity) private Repository: Repository<CategoryEntity>) {}
  findAll() {
    return this.Repository.find();
  }
 async create(body: any) {
    const {product_id, ...rest} = body;   
    const newCategory =  this.Repository.create(rest as any);
     await this.Repository.save(newCategory as any);
     return "Create successfully"
  }
  async update(id: number, updateProductDto: any) {
    await this.Repository.createQueryBuilder()
    .update(CategoryEntity).set({
      nameCategory: updateProductDto.nameCategory,
      img: updateProductDto.imgs
    }).where({ idCategory: id }).execute();
    return `This action updates a #${id} product`;
  }
  remove(id: number) {
    return this.Repository.delete(id);
  }
}
