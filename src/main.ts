import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);//, { cors: true });

  app.enableCors();

  app.setGlobalPrefix("api/v1");

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const config = new DocumentBuilder()
    .setTitle("Todo example")
    .setDescription("The todo API description")
    .setVersion("1.0")
    .setContact("Raul Bolivar Navas", "https://www.linkedin.com/in/rasysbox", "rasysbox@hotmail.com")
    .setLicense("MIT", "https://opensource.org/licenses/MIT")
    .setTermsOfService("https://www.linkedin.com/in/rasysbox")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(5001);
}
bootstrap();
