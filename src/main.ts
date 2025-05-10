import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONFIG } from 'configuration';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const PORT = CONFIG?.port ?? 3000;
  await app.listen(PORT, () =>
    console.log(`Listening on PORT: ${PORT}
    `),
  );
}
bootstrap();
