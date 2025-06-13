import { Test, TestingModule } from '@nestjs/testing';
import { ProtectedController } from './protected.controller';
import { ExecutionContext } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// 👇 Mock JwtAuthGuard to always allow access
class MockJwtAuthGuard {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    request.user = { userId: '123', email: 'test@example.com' };
    return true;
  }
}

describe('ProtectedController', () => {
  let controller: ProtectedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtectedController],
    })
      .overrideProvider(JwtAuthGuard)
      .useClass(MockJwtAuthGuard) // 👈 use the mocked guard
      .compile();

    controller = module.get<ProtectedController>(ProtectedController);
  });

  it('should return protected message and user info', () => {
    const mockRequest = {
      user: {
        userId: '123',
        email: 'test@example.com',
      },
    };

    const result = controller.getProtected(mockRequest as any);
    expect(result).toEqual({
      message: 'You have accessed a protected route!',
      user: mockRequest.user,
    });
  });
});
