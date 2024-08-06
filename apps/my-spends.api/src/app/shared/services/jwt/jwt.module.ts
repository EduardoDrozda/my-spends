import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule as JwtNestModule } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { JWT_SERVICE } from './iJwt.service';

@Module({
  imports: [
    JwtNestModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtService,
    {
      provide: JWT_SERVICE,
      useClass: JwtService
    }
  ],
  exports: [
    JWT_SERVICE,
    JwtService
  ],
})
export class JwtModule { }
