import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Order, OrderStatus } from './orders.entity';
import { OrderItem } from './order-items.entity';
import { Product } from '../products/products.entity';
import { Inventory } from '../inventory/inventory.entity';

@Injectable()
export class OrdersService {
  constructor(private dataSource: DataSource) {}

  // Create a new order with items in a transaction
  async createOrder(userId: number, items: { productId: number; quantity: number }[]) {
    return await this.dataSource.transaction(async (manager) => {
      const order = new Order();
      order.status = OrderStatus.PENDING;
      order.user = { id: userId } as any;
      order.items = [];

      for (const item of items) {
        // Check product existence
        const product = await manager.findOne(Product, { where: { id: item.productId }, relations: ['inventory'] });
        if (!product) throw new BadRequestException(`Product ID ${item.productId} not found`);

        const inventory = product.inventory;
        if (!inventory) throw new BadRequestException(`Inventory not found for product ID ${item.productId}`);
        if (inventory.quantity < item.quantity) throw new BadRequestException(`Not enough stock for product ${product.name}`);

        // Deduct quantity from inventory
        inventory.quantity -= item.quantity;
        await manager.save(inventory);

        // Create order item
        const orderItem = new OrderItem();
        orderItem.product = product;
        orderItem.quantity = item.quantity;
        order.items.push(orderItem);
      }

      // Save the order with items
      return await manager.save(order);
    });
  }
}