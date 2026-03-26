import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req, @Body() body: { items: { productId: number; quantity: number }[] }) {
    const userId = req.user.id;
    return this.ordersService.createOrder(userId, body.items);
  }
}