import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import * as packages from '@/../../package.json';
import * as basicAuth from 'basic-auth-connect';

export default (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle(packages.name)
    // .setDescription(pkg.description)
    .setVersion(packages.version)
    .setContact(
      'Samgar Seriknur',
      'https://github.com/sama-kun',
      'samgar.robot@gmail.com',
    )
    .addBearerAuth({
      type: 'http',
      description: 'Can be received at `/auth/login` endpoint',
      name: 'Authorization',
      in: 'header', // Corrected the 'in' property value to 'header'
    })
    .build();

  app.use('/' + process.env.SWAGGER_PATH, basicAuth('codi_teach', '030715'));
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(process.env.SWAGGER_PATH, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
