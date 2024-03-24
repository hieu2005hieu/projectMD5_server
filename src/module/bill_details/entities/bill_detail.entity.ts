import { BillEntity } from "src/module/bill/entities/bill.entity";
import { ProductEntity } from "src/module/products/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'bill_details' })
export class BillDetailEntity {
    @PrimaryGeneratedColumn()
    bills_details_Bd_Id: number

    // @Column({
    //     type: 'int'
    // })
    // producst_Id: number
    
    @Column({
        type: 'int'
    })
    quantity: number

    @ManyToOne(() => ProductEntity, (bill_detail) => bill_detail.idProducts)
    @JoinColumn({ name: 'producst_Id' })
    ProductsId: ProductEntity

     @ManyToOne(() => BillEntity, (bill) =>bill.billdetail)
    @JoinColumn({ name: ' bills_details_Id' })
    IdBill: BillEntity
}
