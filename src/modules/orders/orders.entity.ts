import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { OrderItem } from './order-items.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // The user who created the order
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  // Status of the order (PENDING, CONFIRMED, CANCELLED)
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  // Timestamp of order creation
  @CreateDateColumn()
  createdAt: Date;

  // List of items in the order
  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];
}