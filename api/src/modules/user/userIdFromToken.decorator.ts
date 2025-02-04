// https://stackoverflow.com/questions/65655181/extends-the-request-interface-to-add-a-fixed-user-property-and-extend-any-other
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user || !request.user.id) {
        throw new UnauthorizedException('User not found in request');
    }
    
    return request.user.id as string;
  },
);
