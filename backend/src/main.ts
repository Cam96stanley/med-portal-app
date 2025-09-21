import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CognitoAuthGuard, GlobalAuthGuard } from 'src/common/guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const reflector = app.get(Reflector);
  const cognitoAuthGuard = app.get(CognitoAuthGuard);
  app.useGlobalGuards(new GlobalAuthGuard(reflector, cognitoAuthGuard));

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3333);
}
void bootstrap();
