import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

 async register(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await this.usersService.create(email, hashedPassword);
  const payload = { email: user.email, sub: user._id };
  const token = this.jwtService.sign(payload);

  return { access_token: token };
}


  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
