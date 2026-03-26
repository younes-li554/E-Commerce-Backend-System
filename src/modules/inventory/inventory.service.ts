import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Inventory } from './inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/products.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // Update inventory quantity for a product
  async updateQuantity(productId: number, quantity: number) {
    const product = await this.productRepository.findOne({ where: { id: productId }, relations: ['inventory'] });
    if (!product) throw new BadRequestException('Product not found');

    const inventory = product.inventory;
    if (!inventory) throw new BadRequestException('Inventory not found');

    const newQuantity = inventory.quantity + quantity;
    if (newQuantity < 0) throw new BadRequestException('Quantity cannot be negative');

    inventory.quantity = newQuantity;
    return this.inventoryRepository.save(inventory);
  }
}