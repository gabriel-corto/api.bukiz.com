import { Injectable } from '@nestjs/common';

import { Customer } from '@/domain/entities/customer/customer.entity';
import { CustomersRepository } from '@/domain/repositories/customers.repository';

import { PrismaService } from '../prisma.service';
import { PrismaCustomerMapper } from '../mappers/prisma-customers.mapper';

@Injectable()
export class PrismaCustomersRepository implements CustomersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    const user = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });
    return user ? PrismaCustomerMapper.toDomain(user) : null;
  }

  async findById(id: string): Promise<Customer | null> {
    const user = await this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
    return user ? PrismaCustomerMapper.toDomain(user) : null;
  }

  async findCustomerProfile(id: string): Promise<Customer> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id,
      },
    });

    return customer
      ? PrismaCustomerMapper.toDomain(customer)
      : ({} as Customer);
  }

  async save(user: Customer): Promise<Customer> {
    const data = PrismaCustomerMapper.toPrisma(user);
    const updatedUser = await this.prisma.customer.upsert({
      where: { id: user.id },
      create: data,
      update: data,
    });
    return PrismaCustomerMapper.toDomain(updatedUser);
  }

  async create(user: Customer): Promise<Customer> {
    const data = PrismaCustomerMapper.toPrisma(user);
    const createdUser = await this.prisma.customer.create({
      data,
    });
    return PrismaCustomerMapper.toDomain(createdUser);
  }
}
