import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class Application {
  private app: INestApplication;
  private configService: ConfigService;
  private globalPrefix = 'api';

  private async setApplication(): Promise<void> {
    this.app = await NestFactory.create(AppModule);
    this.configService = this.app.get(ConfigService);
  }

  private async setGlobalPrefix(): Promise<void> {
    this.app.setGlobalPrefix(this.globalPrefix);
    this.app.useGlobalPipes(new ValidationPipe());
  }

  private getPort(): number {
    return this.configService.get<number>('APP_PORT');
  }

  private configSwagger(): void {
    const config = new DocumentBuilder()
      .setTitle('My Spends API')
      .setDescription('API to manage your spends')
      .setVersion('1.0')
      .addTag('spends')
      .build();

    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('swagger', this.app, document);
  }

  async start(): Promise<void> {
    await this.setApplication();
    await this.setGlobalPrefix();
    await this.configSwagger();
    const port = this.getPort();

    await this.app
      .listen(port)
      .then(() => {
        Logger.log(
          `🚀 Application is running on: http://localhost:${port}/${this.globalPrefix}`,
          'Application'
        );
      })
      .catch((error) => {
        Logger.error(`Error starting application: ${error}`, 'Application');
        process.exit(1);
      });
  }
}
