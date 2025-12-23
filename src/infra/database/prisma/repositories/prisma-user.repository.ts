import { Injectable } from '@nestjs/common';

import { User } from '@/domain/entities/user/user.entity';
import { UsersRepository } from '@/domain/repositories/users.repository';

import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user.mapper';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user ? PrismaUserMapper.toDomain(user) : null;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user ? PrismaUserMapper.toDomain(user) : null;
  }

  async save(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);
    const updatedUser = await this.prisma.user.upsert({
      where: { id: user.id },
      create: data,
      update: data,
    });
    return PrismaUserMapper.toDomain(updatedUser);
  }

  async create(user: User): Promise<User> {
    const data = PrismaUserMapper.toPrisma(user);
    const createdUser = await this.prisma.user.create({
      data,
    });
    return PrismaUserMapper.toDomain(createdUser);
  }
}
