import { BillEntity } from "src/module/bill/entities/bill.entity";
import { CartEntity } from "src/module/cart/entities/cart.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    idUser: number;
    @Column(
        {
            type: 'varchar',
            length: '55'
        }
    )
    username: string;
    
    @Column(
        {
            type: 'varchar',
            length: '255'
        }
    )
    password: string;

    @Column(
        {
            type: 'varchar',
            length: '55',
        }
    )
    email: string;

    @Column(
        {
            type: 'tinyint',
            default: 0
        }
    )
    role: number;

    @Column(
        {
            type: 'tinyint',
            default: 1
        }
    )
    status: number;

    @Column(
        {
            type: 'longtext',
            nullable: true
        }
    )
    img: string;

    @OneToMany(() => CartEntity, (cart) =>cart.idCart)
    cart: CartEntity[]
     @OneToMany(() => BillEntity, (bill) =>bill)
    bill: BillEntity[]
}
