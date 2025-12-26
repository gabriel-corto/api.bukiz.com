import { Injectable } from '@nestjs/common';

import { Costumer } from '@/domain/entities/costumer/costumer.entity';
import { CostumersRepository } from '@/domain/repositories/costumers.repository';

import { PrismaService } from '../prisma.service';
import { PrismaCostumerMapper } from '../mappers/prisma-costumers.mapper';

@Injectable()
export class PrismaCostumersRepository implements CostumersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prisma.costumer.findUnique({
      where: {
        email,
      },
    });
    return user ? PrismaCostumerMapper.toDomain(user) : null;
  }

  async findById(id: string): Promise<Costumer | null> {
    const user = await this.prisma.costumer.findUnique({
      where: {
        id,
      },
    });
    return user ? PrismaCostumerMapper.toDomain(user) : null;
  }

  async findCostumerProfile(id: string): Promise<Costumer> {
    const costumer = await this.prisma.costumer.findUnique({
      where: {
        id,
      },
    });

    return costumer
      ? PrismaCostumerMapper.toDomain(costumer)
      : ({} as Costumer);
  }

  async save(user: Costumer): Promise<Costumer> {
    const data = PrismaCostumerMapper.toPrisma(user);
    const updatedUser = await this.prisma.costumer.upsert({
      where: { id: user.id },
      create: data,
      update: data,
    });
    return PrismaCostumerMapper.toDomain(updatedUser);
  }

  async create(user: Costumer): Promise<Costumer> {
    const data = PrismaCostumerMapper.toPrisma(user);
    const createdUser = await this.prisma.costumer.create({
      data,
    });
    return PrismaCostumerMapper.toDomain(createdUser);
  }
}
