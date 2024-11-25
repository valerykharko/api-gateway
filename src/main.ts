import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";

import "module-alias/register";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get("PORT") || 3000;

  await app.listen(port, () => {
    console.log(`API Gateway is running on http://localhost:${port}`);
  });
}
bootstrap();