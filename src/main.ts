import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import { ExpressAdapter, NestExpressApplication } from "@nestjs/platform-express";
import * as http from "http";
import * as https from "https";
import { readFileSync } from "fs";
import * as express from "express";

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server));

  const origin = ['https://yakdveri.com.ua',  'https://www.yakdveri.com.ua', 'http://localhost:4200', 'https://127.0.0.1:5000'];

  app.enableCors({ origin });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: false,
    }),
  );

  const env = process.env.NODE_ENV || "development";
  const port = app.get(ConfigService).get("PORT");

  if (env === "development") {
    http.createServer(server).listen(port);
  }

  if (env === "production") {
    const sslKeyPath = app.get(ConfigService).get("SSL_KEY_PATH");
    const sslCertPath = app.get(ConfigService).get("SSL_CERT_PATH");

    const httpsOptions = {
      key: readFileSync(sslKeyPath),
      cert: readFileSync(sslCertPath),
    };

    https.createServer(httpsOptions, server).listen(port, "127.0.0.1");
  }

  await app.init();
}
bootstrap();
