import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import { join } from "path";
import { AppModule } from "./app.module";
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.enableCors();

  app.engine("handlebars", engine());
  app.useStaticAssets(join(__dirname, "..", "/public"));
  app.setBaseViewsDir(join(__dirname, "..", "/views"));
  app.setViewEngine("handlebars");
  await app.listen(3000);
}
bootstrap();
