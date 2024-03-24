import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('api/v1/bill')
export class BillController {
  constructor(private readonly billService: BillService) { }

  @Get("listBill")
  async getbillAll() {
    return this.billService.getbillAll();
  }
  @Get("getBillById/:id")
  async getBillById(@Param() id: any) {    
    return this.billService.getBillById(id.id);
  }
   @Post("createOrder")
   async createOrder(@Body() orderData: any) {
    return await this.billService.createOrder(orderData);
  }



  @Patch('statusCancel/:id')
  async update(@Param('id') id: string) {
   
    // await this.billService.statusCancel(+id)
    // await this.billService.updateStocksProduct(+id,1)
    return {
      message: 'Đã hủy đơn hàng',
    }
    
    // this.billService.updateStocksProduct(+id)
  }
   @Patch('statusConfirm/:id')
  updateconfirm(@Param('id') id: string) {
    
    return this.billService.statusconfirm(+id);
  }
  

}
