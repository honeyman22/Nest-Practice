import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodValidationExceptionFilter } from './pipeline/zod-validation-exceptions';
import { CustomZodValidationPipe } from './pipeline';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new CustomZodValidationPipe());
  app.useGlobalFilters(new ZodValidationExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
