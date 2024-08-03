import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

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
  }

  private getPort(): number {
    return this.configService.get<number>('APP_PORT');
  }

  async start(): Promise<void> {
    await this.setApplication();
    await this.setGlobalPrefix();
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
