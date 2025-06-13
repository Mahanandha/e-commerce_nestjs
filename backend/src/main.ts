import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

class AppBootstrap {
  async initializeApp() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors({
      origin: 'http://localhost:3001', 
      credentials: true,
    });

    this.configureStaticAssets(app);
    await this.listen(app);
  }

  private configureStaticAssets(app: NestExpressApplication) {
    app.useStaticAssets(join(__dirname, '..', 'uploads'), {
      prefix: '/uploads/',
    });
  }

  private async listen(app: NestExpressApplication) {
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`Server running on http://localhost:${port}`);
  }
}

new AppBootstrap().initializeApp();
