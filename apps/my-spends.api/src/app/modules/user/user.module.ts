import { Module } from '@nestjs/common';
import { UserService } from './application/services/user/user.service';
import { HashModule } from '@shared/services';
import { UserController } from './api/controllers/user/user.controller';
import { USER_REPOSITORY } from './application/repositories/user';
import { UserRepository } from './infrastructure/repositories/user';
import { USER_SERVICE } from './application/services/user';

@Module({
  imports: [HashModule],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: USER_SERVICE,
      useClass: UserService,
    },
  ],
  exports: [USER_SERVICE],
})
export class UserModule { }
