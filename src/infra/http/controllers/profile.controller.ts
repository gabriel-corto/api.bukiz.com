import type { AuthTokenPayload } from '@/types/api';
import { Controller, Get } from '@nestjs/common';

import { CurrentCostumer } from '@/infra/shared/decorators/current.costumer.decorator';

import { CostumersRepository } from '@/domain/repositories/costumers.repository';
import { CostumerViewModel } from '../view-model/costumer-view-model';

@Controller('profile')
export class ProfileController {
  constructor(private costumersRepository: CostumersRepository) {}

  @Get('/me')
  async findCostumerNotifications(
    @CurrentCostumer() costumer: AuthTokenPayload,
  ) {
    const costumerId = costumer.sub;
    const profile =
      await this.costumersRepository.findCostumerProfile(costumerId);

    return {
      data: CostumerViewModel.toHttp(profile),
    };
  }
}
