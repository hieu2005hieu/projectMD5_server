import { Injectable } from "@nestjs/common";
import { BillDetailEntity } from "src/module/bill_details/entities/bill_detail.entity";
import { CartEntity } from "src/module/cart/entities/cart.entity";
import { CategoryEntity } from "src/module/categories/entities/category.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Injectable()
@Entity({ name: 'products' })
export class ProductEntity { 
    @PrimaryGeneratedColumn()
    idProducts: number;

    @Column({
        type: 'varchar',
        length: '55'
    })
    nameProducts: string;

    @Column({
        type: 'int',
    })
    stock: number;

    @Column({
        type: 'int'
    })
    price: number;

    @Column({
        type: 'longtext'
    })
    imgs: string;

    // @Column({
    //     type: 'int'
    // })
    // categoryId: number;


    @Column({
        type: 'varchar',
        length: '255'
    })
    description: string;

    @ManyToOne(() => CategoryEntity, (category) => category.products)
    @JoinColumn({ name: 'categoryId' })
    category: CategoryEntity


    @OneToMany(() => CartEntity, (cart) =>cart.idCart)
    cart: CartEntity[]
    @OneToMany(() => BillDetailEntity, (billdetail) =>billdetail.ProductsId)
    billdetail: BillDetailEntity[]
}
