import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async pay(
    @Req() req,
    @Body() body: { orderId: number; amount: number; idempotencyKey: string },
  ) {
    return this.paymentsService.createPayment(body.orderId, body.amount, body.idempotencyKey);
  }
}