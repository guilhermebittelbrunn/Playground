import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT || 3000);
  console.log(`Server listening on ${PORT || 3000}`);
}
bootstrap();
