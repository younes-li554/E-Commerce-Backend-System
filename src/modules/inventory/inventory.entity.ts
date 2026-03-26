import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Product } from '../products/products.entity';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  quantity: number;

  // Foreign key to Product
  @OneToOne(() => Product, (product) => product.inventory)
  @JoinColumn()
  product: Product;
}