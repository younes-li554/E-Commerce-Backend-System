import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Register endpoint
  @Post('register')
  async register(@Body() body: any) {
    const { email, password } = body;
    return this.authService.register(email, password);
  }

  // Login endpoint
  @Post('login')
  async login(@Body() body: any) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }
}