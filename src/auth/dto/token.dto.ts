import { Role } from 'src/decorators/role.decorator';

export class TokenDto {
  iat?: Date;
  exp?: Date;
  subject: string;
  publicData: PublicData;
}

export class PublicData {
  email: string;
  id: string;
  role: Role;
}
