import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/create-auth.dto';
import { Prisma } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(`login`)
  login(@Body() createAuthDto: UserLoginDto) {
    return this.authService.login(createAuthDto);
  }

  @Post(`signup`)
  register(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.authService.register(createUserDto);
  }
}
