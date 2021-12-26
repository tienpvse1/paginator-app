import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { UpdateFormDto } from 'src/form/dto/update-form.dto';

export const Form = createParamDecorator(
  (isAdmin = false, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const form: UpdateFormDto = request.body;
    if (!isAdmin && form.status) {
      // when user is not admin, and they want to update form status, block them!
      throw new UnauthorizedException('user cannot update form status');
    } else {
      // remove the status so that only admin can update the form's status
      // double check so that they can not update it anyway
      const { status, ...rest } = form;
      return rest;
    }
  },
);
