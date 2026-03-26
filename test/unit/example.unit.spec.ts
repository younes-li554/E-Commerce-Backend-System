import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../src/modules/users/users.service';
import { UserRole } from 'src/modules/users/users.entity'; 

describe('UsersService (Unit)', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.create('test@example.com', 'password', UserRole.CUSTOMER);
    expect(user.email).toBe('test@example.com');
  });
});