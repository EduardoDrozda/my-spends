import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IHashService } from './iHash.service';

import bcrypt from 'bcrypt';

@Injectable()
export class HashService implements IHashService {

  constructor(private readonly configService: ConfigService) {}

  async hash(value: string): Promise<string> {
    const salt = this.configService.get<number>('HASH_SALT');
    return bcrypt.hash(value, salt);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(value, hash);
  }

}
