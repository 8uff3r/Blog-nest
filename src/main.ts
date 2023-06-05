import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
import { engine } from "express-handlebars";
import { join } from "path";
import { AppModule } from "./app.module";

const dotenv = require("dotenv");
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "../.env.production" });
} else {
  dotenv.config({ path: "../.env.debug" });
}
console.log(process.env.DATABASE_PORT);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.engine("handlebars", engine());
  app.useStaticAssets(join(__dirname, "..", "/public"));
  app.setBaseViewsDir(join(__dirname, "..", "/views"));
  app.setViewEngine("handlebars");
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  });
  await app.listen(3000, "0.0.0.0");
}
bootstrap();
