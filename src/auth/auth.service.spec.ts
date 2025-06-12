import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    create: jest.fn().mockResolvedValue({ _id: 'mock-id', email: 'test@example.com' }),
    findByEmail: jest.fn().mockResolvedValue(null),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mock-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should create a user and return a JWT', async () => {
  const result = await service.register('test@example.com', 'password123');
  expect(result.access_token).toBe('mock-jwt-token');
  expect(mockUsersService.create).toHaveBeenCalled();
});
});
