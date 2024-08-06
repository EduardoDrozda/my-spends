import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AUTH_SERVICE } from './interfaces';
import { UserModule } from '@modules/user';
import { JwtModule } from '@shared/services/jwt';
import { HashModule } from '@shared/services';

@Module({
  imports: [
    HashModule,
    JwtModule,
    UserModule
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
})
export class AuthModule { }
