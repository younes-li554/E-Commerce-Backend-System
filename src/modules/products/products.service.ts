import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { Inventory } from '../inventory/inventory.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  // Create a new product and initialize inventory
  async createProduct(name: string, price: number, description?: string) {
    const product = this.productRepository.create({ name, price, description });
    const savedProduct = await this.productRepository.save(product);

    // Initialize inventory with quantity 0
    const inventory = this.inventoryRepository.create({ product: savedProduct, quantity: 0 });
    await this.inventoryRepository.save(inventory);

    return savedProduct;
  }

  // Get all products with inventory
  async getAllProducts() {
    return this.productRepository.find({ relations: ['inventory'] });
  }
}