import { ProductEntity } from "src/module/products/entities/product.entity";
import { UserEntity } from "src/module/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'cart' })
export class CartEntity {
    @PrimaryGeneratedColumn()
    idCart: number

    // @Column({
    //     type: 'int'
    // })
    // idUser: number

    // @Column({
    //     type: 'int'
    // })
    // ProductsID: number
    
    @Column({
        type: 'int'
    })
    quantity: number

    @ManyToOne(() => ProductEntity, (product) => product.cart)
    @JoinColumn({ name: 'ProductsID' })
    productsId: ProductEntity
       
    
    @ManyToOne(() => UserEntity, (cart) => cart.cart)
    @JoinColumn({ name: 'idUser' })
    users: UserEntity
}
