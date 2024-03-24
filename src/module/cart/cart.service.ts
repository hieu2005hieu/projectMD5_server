import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from './entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
  ) {}
  async findall(id: any) {
    return await this.cartRepository
      .createQueryBuilder('cart')
      .select()
      .where({ users: id })
      .innerJoinAndSelect('cart.productsId', 'productsId')
      .getMany();
  }
  async create(userId: any, product: any) {
      const check = await this.getCartByUserId(userId, product.idProducts);
    if (check.length > 0) {
      return {
        message: 'Sản phẩm đã có trong giỏ hàng',
      };
      //   await this.cartRepository.createQueryBuilder('cart')
      //   .update('cart')
      //   .set({ quantity: check[0].quantity + 1 })
      //   .where({ users: userId, productsId: product.idProduct })
      //   .execute()
    } else {
      await this.cartRepository
        .createQueryBuilder('cart')
        .insert()
        .into('cart')
        .values({ users: userId, productsId: product, quantity: 1 })
        .execute();
      return {
        message: 'Thêm Vào Giỏ Hàng Thành Công',
      };
    }
  }
  async updateQuantityGiam(createquantyti: any) {
    const cart = await this.cartRepository.findOneOrFail({
      where: { idCart: createquantyti.idCart },
    });
    cart.quantity -= 1;
    return this.cartRepository.save(cart);
  }

  async updateQuantityTang(createquantyti: any) {
    const cart = await this.cartRepository.findOneOrFail({
      where: { idCart: createquantyti.idCart },
    });
    cart.quantity += 1;
    return this.cartRepository.save(cart);
  }
  async getCartByUserId(userId: any, productsId: any) {
    return await this.cartRepository
      .createQueryBuilder('cart')
      .select()
      .where({ users: userId })
      .andWhere({ productsId: productsId })
      .getMany();
  }
  async uppdateQuantity(userId: any, productsId: any, quantity: any) {
    await this.cartRepository
      .createQueryBuilder('cart')
      .update()
      .set({ quantity: quantity })
      .where({ users: userId })
      .andWhere({ productsId: productsId })
      .execute();
  }
  async deleteProducts(idCart: any) {
    await this.cartRepository
      .createQueryBuilder('cart')
      .delete()
      .where({ idCart: idCart })
      .execute();
    }
    //xoa cart theo userId, xoa tat ca
    async deleteAll(userId: number) {
    await this.cartRepository
        .createQueryBuilder()
        .delete()
        .from(CartEntity)
        .where("users = :users", { users: userId })
        .execute();
    return `Xoá cart thành công`;
}
}
