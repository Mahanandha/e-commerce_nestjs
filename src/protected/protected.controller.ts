import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProtected(@Request() req) {
    return {
      message: 'You have accessed a protected route!',
      user: req.user, // contains userId and email from JWT payload
    };
  }
}
