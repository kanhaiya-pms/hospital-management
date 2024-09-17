import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    // methods: ["get","post","put","delete"]
  })

  const config = new DocumentBuilder()
    .setTitle('hospital-management example')
    .setDescription('The hospital-management API description')
    .setVersion('1.0')
    .addTag('hospital-management')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
  })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT, ()=>{
    Logger.debug(`server is runnning on http://localhost:${process.env.PORT}/api`)
  });
}
bootstrap();
