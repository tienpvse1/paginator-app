import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PublicData } from 'src/auth/dto/token.dto';

export const User = createParamDecorator(
  (data: keyof PublicData, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: PublicData = request.user;

    return data ? user?.[data] : user;
  },
);
