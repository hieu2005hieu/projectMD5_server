import { BillDetailEntity } from "src/module/bill_details/entities/bill_detail.entity";
import { UserEntity } from "src/module/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum statusEnum {
   DONE =  "Xác Nhận",
   PENDING=  "Đang Chờ",
    CANCEL = "Đã Hủy"
}

@Entity({ name: 'bill' })
export class BillEntity {
    @PrimaryGeneratedColumn()
    idBill: number

    // @Column({
    //     type: 'int'
    // })
    // userID: number
    
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 0
    })
    total: number

    @Column({
        type: 'enum',
        enum: statusEnum,
        default: statusEnum.PENDING
    })
    status: statusEnum

    @Column({
        type: 'varchar',
        length: '10'
    })
    phone_number: string

    @Column({
        type: 'varchar',
        length: '254'
    })
    address: string

    @Column({
        type: 'varchar',
        length: '255'
    })
    nameUserbill: string


    @ManyToOne(() => UserEntity, (bill) => bill.bill)
    @JoinColumn({ name: 'userID' })
    user: UserEntity

     @OneToMany(() => BillDetailEntity, (billdetail) =>billdetail.IdBill)
    billdetail: BillDetailEntity[]
}
