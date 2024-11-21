import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async login(createAuthDto: UserLoginDto) {
    const user = await this.databaseService.user.findUnique({
      where: { email: createAuthDto.email },
    });
    if (!user) throw new NotFoundException('User not found');

    const isCorrectPassword = await bcrypt.compare(
      createAuthDto.password,
      user.password,
    );

    if (!isCorrectPassword) throw new NotFoundException('Invalid password');

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      username: user.name,
    });
    const updatedUser = await this.databaseService.user.update({
      where: { email: createAuthDto.email },
      data: { accessToken },
    });
    return {
      message: 'User created successfully',
      data: updatedUser,
    };
  }

  async register(createUserDto: Prisma.UserCreateInput) {
    const isEmailExists = await this.databaseService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (isEmailExists)
      throw new NotFoundException('User email already exists.');

    const isPhoneExists = await this.databaseService.user.findUnique({
      where: {
        phoneNumber: createUserDto.phoneNumber,
      },
    });

    if (isPhoneExists)
      throw new NotFoundException('User phone number already exists.');
    const encryptedpassword = await bcrypt.hash(createUserDto?.password, 10);

    const user = await this.databaseService.user.create({
      data: { ...createUserDto, password: encryptedpassword },
    });
    const payload = { sub: user.id, username: user.name };
    const accessToken = await this.jwtService.signAsync(payload);

    const updatedUser = await this.databaseService.user.update({
      where: { id: user.id },
      data: { ...user, accessToken },
    });
    return {
      message: 'User created successfully',
      data: updatedUser,
    };
  }
}
