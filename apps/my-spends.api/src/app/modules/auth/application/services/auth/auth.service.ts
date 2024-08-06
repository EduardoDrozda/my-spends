import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDTO, GetAuthDTO } from '../../../api/dtos';
import { IJwtService, JWT_SERVICE } from '@shared/services/jwt/iJwt.service';
import { HASH_SERVICE, IHashService } from '@shared/services';
import { IAuthService } from './iAuth.service';
import { IUserService, USER_SERVICE } from '@modules/user/application/services';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
    @Inject(JWT_SERVICE) private readonly jwtService: IJwtService,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
  ) { }

  async login({ email, password }: CreateAuthDTO): Promise<GetAuthDTO> {
    const user = await this.userService.findByEmail(email);

    if (!user || !(await this.hashService.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.sign({ userId: user.id });

    return {
      token,
      type: 'Bearer',
    }
  }
}
