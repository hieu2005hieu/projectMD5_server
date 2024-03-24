import { Injectable } from '@nestjs/common';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillDetailEntity } from './entities/bill_detail.entity';
import { Repository } from 'typeorm';
import { ProductEntity } from '../products/entities/product.entity';

@Injectable()
export class BillDetailsService {
   constructor(@InjectRepository(BillDetailEntity) private billDetailRepository: Repository<BillDetailEntity>) {}
   
async findOne(orderId: number) {
    return await this.billDetailRepository.createQueryBuilder("order_detail")
    .innerJoinAndSelect("order_detail.ProductsId","products")
    .where("order_detail.IdBill = :orderId", {orderId})
    .getMany()
  }
  //tao orderDetail
  createBillDetailer(orderId: number, productId: number, quantity: number) {
    const obj={
      IdBill:orderId as any,
      ProductsId:productId as any,
      quantity:quantity
    }
    const data = this.billDetailRepository.create(obj)
    this.billDetailRepository.save(data)
    return 'them thanh cong';
  }
  async updateStocksProduct(productId:number,quantity:number){
    await this.billDetailRepository.createQueryBuilder().update(ProductEntity).set({
      stock: () => 'stock - ' + quantity 
    })
    .where("idProducts = :productId", {productId})
    .execute()
  }
}
