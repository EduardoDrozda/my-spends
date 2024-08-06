import { Module } from '@nestjs/common';
import { HashService } from './hash.service';
import { HASH_SERVICE } from './iHash.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    HashService,
    {
      provide: HASH_SERVICE,
      useClass: HashService,
    },
  ],
  exports: [HASH_SERVICE, HashService],
})
export class HashModule {}
