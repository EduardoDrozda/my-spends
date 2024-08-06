import { Injectable } from '@nestjs/common';
import { IJwtService } from './iJwt.service';
import { JwtService as JwtNestService } from '@nestjs/jwt';

@Injectable()
export class JwtService implements IJwtService {
  constructor(private readonly jwtService: JwtNestService) {}

  async sign(payload: any): Promise<string> {
    return this.jwtService.signAsync(payload);

  }

  async verify(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token);
  }
}
