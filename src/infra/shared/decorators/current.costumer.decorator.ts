import { AuthTokenPayload } from '@/types/api';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentCostumer = createParamDecorator(
  (data: keyof AuthTokenPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const costumer = request.costumer;

    if (data) {
      return costumer?.[data];
    }

    return costumer;
  },
);
