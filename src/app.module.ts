import { Module } from "@nestjs/common";
import { GatewayModule } from "./modules/gateway/gateway.module";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
  imports: [
    GatewayModule,
    ClientsModule.register([
      {
        name: "AUTH_SERVICE",
        transport: Transport.RMQ,
        options: { queue: "auth-service", port: 3001 },
      },
      {
        name: "ORDER_SERVICE",
        transport: Transport.RMQ,
        options: { queue: "order-service", port: 3002 },
      },
      {
        name: "USER_SERVICE",
        transport: Transport.TCP,
        options: { host: "user-service", port: 3003 },
      },
    ]),
  ],
})
export class AppModule {}
