import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './module/users/entities/user.entity';
import { UsersModule } from './module/users/users.module';
import { ProductEntity } from './module/products/entities/product.entity';
import { CategoryEntity } from './module/categories/entities/category.entity';
import { CartEntity } from './module/cart/entities/cart.entity';
import { BillDetailEntity } from './module/bill_details/entities/bill_detail.entity';
import { BillEntity } from './module/bill/entities/bill.entity';
import { ProductsModule } from './module/products/products.module';
import { CategoriesModule } from './module/categories/categories.module';
import { BillModule } from './module/bill/bill.module';
import { BillDetailsModule } from './module/bill_details/bill_details.module';
import { CartModule } from './module/cart/cart.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'projectmd05',
    entities: [UserEntity,ProductEntity,CategoryEntity,CartEntity,BillDetailEntity,BillEntity],
    synchronize: true
  }),UsersModule,ProductsModule,CategoriesModule,BillModule,BillDetailsModule,CartModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
