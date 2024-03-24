import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillEntity, statusEnum } from './entities/bill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BillService {
  constructor(@InjectRepository(BillEntity) private billRepository: Repository<BillEntity>) { }
 
  async getbillAll() {
    const billall = await this.billRepository.find();
    
    return billall
  }
  async getBillById(id: any) {
     return await this.billRepository.createQueryBuilder("bill")
    .where("bill.user = :userId", { userId: id })
    .getMany()
  }
  async createOrder(orderData: any) {
    // Xử lý logic tạo đơn hàng và lưu vào cơ sở dữ liệu
    const {userID,user_name, address, phone,status,total } = orderData;
    const createdOrder = this.billRepository.create({ user: userID, total, status, phone_number: phone, address, nameUserbill: user_name });
    return await this.billRepository.save(createdOrder);
  }
  // status huy
  async statusCancel(orderId:number){
    await this.billRepository.createQueryBuilder().update(BillEntity).set({
      status: statusEnum.CANCEL,
    })
    .where("idBill = :orderId", {orderId})
    .execute()
    return 'Đã huỷ thành công'
  }
  async updateStocksProduct(productId: number, quantity: number) {
  console.log(productId)
  console.log(quantity)
    await this.billRepository.createQueryBuilder()
        .update(BillEntity)
        .set({
            total: () => 'total + :quantity'
        })
        .setParameter('quantity', quantity)
        .where("idBill = :productId", { productId })
        .execute();
}

   async statusconfirm(orderId:number){
    await this.billRepository.createQueryBuilder().update(BillEntity).set({
      status: statusEnum.DONE,
    })
    .where("idBill = :orderId", {orderId})
    .execute()
    return 'Đã huỷ thành công'
  }
}
