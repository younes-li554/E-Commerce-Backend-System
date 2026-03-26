import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');

        if (!redisUrl) {
          throw new Error('REDIS_URL is not defined');
        }

        const client = new Redis(redisUrl, {
          retryStrategy: (times) => {
            console.log(`🔁 Redis reconnect attempt #${times}`);
            return Math.min(times * 50, 2000);
          },
        });

        client.on('connect', () => {
          console.log('✅ Redis connected');
        });

        client.on('error', (err) => {
          console.error('❌ Redis error:', err);
        });

        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}