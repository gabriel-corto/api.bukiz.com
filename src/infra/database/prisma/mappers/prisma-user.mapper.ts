import { User } from 'src/domain/entities/user.entity';
import { Prisma } from '@prisma/client';
import { User as PrismaUser } from '@prisma/client';

export class PrismaUserMapper {
  static toPrisma(user: User): Prisma.UserCreateInput {
    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt ?? new Date(),
    };
  }

  static toDomain(raw: PrismaUser): User {
    const user = new User({
      email: raw.email,
    });

    return user;
  }
}
