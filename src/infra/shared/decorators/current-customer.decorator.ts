import { AuthTokenPayload } from '@/types/api';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentCustomer = createParamDecorator(
  (data: keyof AuthTokenPayload | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const customer = request.customer;

    if (data) {
      return customer?.[data];
    }

    return customer;
  },
);
