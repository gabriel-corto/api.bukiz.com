import { Otp } from '@/domain/entities/user/user-otp.entity';
import { User } from '@/domain/entities/user/user.entity';
import { Prisma, User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User): Prisma.UserCreateInput {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? new Date(),
      otp_code: user.otp?.code ?? null,
      otp_expires_in: user.otp?.expiresIn ?? null,
    };
  }

  static toDomain(raw: PrismaUser): User {
    const otp =
      raw.otp_code && raw.otp_expires_in
        ? new Otp({ code: raw.otp_code, expiresIn: raw.otp_expires_in })
        : null;

    const user = new User({
      id: raw.id,
      email: raw.email,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      otp: otp,
    });

    return user;
  }
}
