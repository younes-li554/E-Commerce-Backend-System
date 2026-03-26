import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User, UserRole } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(email: string, password: string, role?: UserRole) {
    const user = this.userRepository.create({
      email,
      password,
      role: role ?? UserRole.CUSTOMER, // ensure correct type
    });

    return this.userRepository.save(user);
  }

  // Find user by email
  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }
}