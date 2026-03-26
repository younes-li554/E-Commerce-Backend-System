import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from './payments.entity';
import { Order, OrderStatus } from '../orders/orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private cacheService: CacheService,
  ) {}

  // Create payment
  async createPayment(orderId: number, amount: number, idempotencyKey: string) {
    // Check idempotency
    const existing = await this.paymentRepository.findOne({ where: { idempotencyKey } });
    if (existing) return existing; // Prevent duplicate payment

    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) throw new BadRequestException('Order not found');

    // Simulate payment success
    const payment = this.paymentRepository.create({
      order,
      amount,
      status: PaymentStatus.COMPLETED,
      idempotencyKey,
    });
    await this.paymentRepository.save(payment);

    // Update order status
    order.status = OrderStatus.CONFIRMED;
    await this.orderRepository.save(order);

    // Invalidate cache for products if needed
    await this.cacheService.clearProductsCache();

    return payment;
  }
}