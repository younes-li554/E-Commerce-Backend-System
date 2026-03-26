import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(@Inject('REDIS_CLIENT') private redisClient: Redis) {}

  async getProductsCache() {
    const cached = await this.redisClient.get('products');
    return cached ? JSON.parse(cached) : null;
  }

  async setProductsCache(data: any) {
    await this.redisClient.set('products', JSON.stringify(data), 'EX', 60); // 1 min TTL
  }

  async clearProductsCache() {
    await this.redisClient.del('products');
  }
}