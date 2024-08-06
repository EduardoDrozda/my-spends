import { Module } from '@nestjs/common';
import { AuthController } from './api/controllers/auth/auth.controller';
import { AUTH_SERVICE, AuthService } from './application/services/auth';
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
