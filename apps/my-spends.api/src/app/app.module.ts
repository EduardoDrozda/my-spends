import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import Joi from 'joi';
import { UserModule } from '@modules/user';
import { AuthModule } from '@modules/auth';
import { validationSchema } from '@config/validation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [join(__dirname, '..', '.env')],
      validationSchema,
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
