import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Order } from '../orders/orders.entity';

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order)
  order: Order;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  // Payment status: pending, completed, failed
  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  // Unique key to prevent duplicate payments
  @Column({ unique: true })
  idempotencyKey: string;

  @CreateDateColumn()
  createdAt: Date;
}