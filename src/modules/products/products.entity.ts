import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Inventory } from '../inventory/inventory.entity';
import { IsNotEmpty, IsPositive } from 'class-validator';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'Product name cannot be empty' })
  name: string;

  @Column('decimal')
  @IsPositive({ message: 'Price must be positive' })
  price: number;

  @Column({ nullable: true })
  description: string;

  // One-to-One relationship with Inventory
  @OneToOne(() => Inventory, (inventory) => inventory.product)
  inventory: Inventory;
}