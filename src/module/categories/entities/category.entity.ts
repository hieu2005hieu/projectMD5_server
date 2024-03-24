import { ProductEntity } from "src/module/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'category' })
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    idCategory: number;

    @Column({
        type: 'varchar',
        length: '55'
    })
    nameCategory: string;

    @Column({
     type: 'longtext'
    })
    img: string;
    
    @OneToMany(() => ProductEntity, (product) =>product.category)
    products: ProductEntity[]
}
