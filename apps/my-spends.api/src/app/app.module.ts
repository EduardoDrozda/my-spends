import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [join(__dirname, '..', '.env')],
      validationSchema: Joi.object({
        APP_PORT: Joi.number(),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
