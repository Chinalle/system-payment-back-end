import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger';

async function bootstrap() {
  const logger = new Logger(AppModule.name);
  logger.log('Starting application module');
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    cretendtials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  logger.log('Starting Swagger module');
  setupSwagger(app);

  await app.listen(port, '0.0.0.0');
  console.log(`Application running on port ${await app.getUrl()}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
}
void bootstrap();
