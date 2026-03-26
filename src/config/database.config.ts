import { DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

import { User } from '../modules/users/users.entity';
import { Product } from '../modules/products/products.entity';
import { Inventory } from '../modules/inventory/inventory.entity';
import { Order } from '../modules/orders/orders.entity';
import { OrderItem } from '../modules/orders/order-items.entity';

dotenv.config();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST ?? 'localhost',
  port: parseInt(process.env.DATABASE_PORT ?? '5432'),
  username: process.env.DATABASE_USER ?? 'user2',
  password: process.env.DATABASE_PASSWORD ?? '123',
  database: process.env.DATABASE_NAME ?? 'ecommerce_db_2',

  
  entities: [User, Product, Inventory, Order, OrderItem],
  
  synchronize: true, 
};