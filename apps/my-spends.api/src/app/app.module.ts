import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { UserModule } from '@modules/user';
import { AuthModule } from '@modules/auth';
import { validationSchema } from '@config/validation.schema';
import { JwtModule } from '@shared/services';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@shared/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [join(__dirname, '..', '.env')],
      validationSchema,
    }),
    UserModule,
    AuthModule,
    JwtModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]
})
export class AppModule {}
