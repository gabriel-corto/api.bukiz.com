import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { UsersRepository } from '@/domain/repositories/users.repository';

@Injectable()
export class UpdateProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  public async execute(data: UpdateProfileDto, id: string) {
    const existingUser = await this.usersRepository.findById(id);

    if (!existingUser) {
      throw new BadRequestException('Usuario nao encontrado!');
    }

    if (data.name) {
      existingUser.updateName(data.name);
    }

    if (data.avatar) {
      existingUser.updateAvatar(data.avatar);
    }

    return await this.usersRepository.update(existingUser);
  }
}
