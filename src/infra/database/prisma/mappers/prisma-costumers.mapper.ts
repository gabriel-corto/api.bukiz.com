import { Otp } from '@/domain/entities/costumer/costumer-otp.entity';
import { Costumer } from '@/domain/entities/costumer/costumer.entity';
import { Prisma, Costumer as PrismaCostumer } from '@prisma/client';

export class PrismaCostumerMapper {
  static toPrisma(costumer: Costumer): Prisma.CostumerCreateInput {
    return {
      id: costumer.id,
      email: costumer.email,
      createdAt: costumer.createdAt,
      updatedAt: costumer.updatedAt ?? new Date(),
      otp_code: costumer.otp?.code ?? null,
      otp_expires_in: costumer.otp?.expiresIn ?? null,
    };
  }

  static toDomain(raw: PrismaCostumer): Costumer {
    const otp =
      raw.otp_code && raw.otp_expires_in
        ? new Otp({ code: raw.otp_code, expiresIn: raw.otp_expires_in })
        : null;

    const costumer = new Costumer({
      id: raw.id,
      email: raw.email,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      otp: otp,
    });

    return costumer;
  }
}
