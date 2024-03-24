import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @Get("getCartByUserId/:id")
  getCartByUserId(@Param() userId: any) {
    return this.cartService.findall(Number(userId.id))
  }
  @Post("addToCart")
  create(@Body() createCartDto: any) {
    const { product, userId } = createCartDto
      return this.cartService.create(userId,product)
    ;
  }


 @Put("updateQuantitygiam")
 updateQuantityGiam(@Body() createquantyti: any) {
   
    return this.cartService.updateQuantityGiam(createquantyti)
  }
  @Put("updateQuantityTang")
  updateQuantityTang(@Body() createquantyti: any) {
    
    return this.cartService.updateQuantityTang(createquantyti)
  }


  @Delete("deleteProducts/:id")
  deleteProducts(@Param() deleteCartDto: any) {
    // const { idCart } = deleteCartDto
    
    return this.cartService.deleteProducts(deleteCartDto.id)
  }
  @Delete('all/:id')
  deleteCartUser(@Param('id') id: string) {
   
    
    return this.cartService.deleteAll(+id);
  }
}
