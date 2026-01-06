import { Otp } from '@/domain/entities/customer/value-objects/otp';
import { Customer } from '@/domain/entities/customer/customer.entity';
import { Email } from '@/domain/entities/customer/value-objects/email';

import { Prisma, Customer as PrismaCustomer } from '@prisma/client';

export class PrismaCustomerMapper {
  static toPrisma(customer: Customer): Prisma.CustomerCreateInput {
    return {
      id: customer.id,
      email: customer.email.getValue,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt ?? new Date(),
      otp_code: customer.otp?.code ?? null,
      otp_expires_in: customer.otp?.expiresIn ?? null,
    };
  }

  static toDomain(raw: PrismaCustomer): Customer {
    const otp =
      raw.otp_code && raw.otp_expires_in
        ? Otp.restore({ code: raw.otp_code, expiresIn: raw.otp_expires_in })
        : null;

    return Customer.restore({
      id: raw.id,
      email: Email.create(raw.email),
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      otp: otp,
    });
  }
}
