import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { EncryptedPassword } from 'src/utils/users/encrypted-password';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<UserDto> {
    const hashedPassword = await EncryptedPassword(data.password);

    const user = this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findByUserName(username: string) {
    return this.prisma.user.findFirst({
      where: {
        username,
      },
    });
  }

  async findByIdUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        username: true,
        role: true,
        isBlocked: true,
        login_attempts: true,
        enterpriseId: true,
        active: true,
        created_at: true,
        updated_at: true,
        lastLogin: true,
      },
    });
    return user;
  }

  async findAllUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        username: true,
        role: true,
        isBlocked: true,
        login_attempts: true,
        enterpriseId: true,
        active: true,
        created_at: true,
        updated_at: true,
        lastLogin: true,
      },
    });

    return users;
  }

  async update(id: string, data: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        username: true,
        role: true,
        isBlocked: true,
        login_attempts: true,
        enterpriseId: true,
        active: true,
        created_at: true,
        updated_at: true,
        lastLogin: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
  }
}
