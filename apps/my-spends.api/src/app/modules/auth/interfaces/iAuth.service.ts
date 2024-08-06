import { GetAuthDTO } from '../dtos';
import { CreateAuthDTO } from '../dtos/create-auth.dto';

export const AUTH_SERVICE = Symbol('AUTH_SERVICE');

export interface IAuthService {
  login(auth: CreateAuthDTO): Promise<GetAuthDTO>;
}
