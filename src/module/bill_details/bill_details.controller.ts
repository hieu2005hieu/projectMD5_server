import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillDetailsService } from './bill_details.service';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';

@Controller('api/v1/bill-details')
export class BillDetailsController {
  constructor(private readonly billDetailsService: BillDetailsService) {}

@Get(':id')
  findOne(@Param('id') id: string) {
    return this.billDetailsService.findOne(+id);
  }




  @Post("createBillDetails")
  async create(@Body() createOrderDetailDto: any) {
    
    const { order_id, productsId, quantity } = createOrderDetailDto
    return await this.billDetailsService.createBillDetailer(order_id, productsId.idProducts, quantity),
    await this.billDetailsService.updateStocksProduct(productsId.idProducts, quantity)

    
    // return this.orderDetailService.create(createOrderDetailDto);
  }
}
