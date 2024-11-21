import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    const AllUsers = await this.databaseService.user.findMany();
    return {
      message: 'User fetched successfully',
      data: AllUsers,
    };
  }

  async findOne(id: number) {
    const oneUser = await this.databaseService.user.findUnique({
      where: { id },
    });
    return {
      message: 'User fetched successfully',
      data: oneUser,
    };
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    const isUserExits = await this.databaseService.user.findUnique({
      where: { id },
    });

    if (!isUserExits) throw new NotFoundException('User not found');
    const updatedUser = await this.databaseService.user.update({
      where: { id },
      data: updateUserDto,
    });
    return {
      message: 'User updated successfully',
      data: updatedUser,
    };
  }

  async remove(id: number) {
    const deletedUser = await this.databaseService.user.delete({
      where: { id },
    });
    return {
      message: 'User deleted successfully',
      data: deletedUser,
    };
  }
}
