import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    register: jest.fn().mockResolvedValue({ message: 'User registered' }),
    login: jest.fn().mockResolvedValue({ access_token: 'mock-token' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService, // ✅ mock injected service
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    const body = { email: 'test@example.com', password: 'pass123' };
    const result = await controller.register(body);
    expect(result).toEqual({ message: 'User registered' });
    expect(authService.register).toHaveBeenCalledWith('test@example.com', 'pass123');
  });

  it('should login a user', async () => {
    const body = { email: 'test@example.com', password: 'pass123' };
    const result = await controller.login(body);
    expect(result).toEqual({ access_token: 'mock-token' });
    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'pass123');
  });
});
