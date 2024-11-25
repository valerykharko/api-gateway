import { Injectable } from '@nestjs/common';
import {
  ClientKafka,
  Transport,
  ClientProxyFactory,
} from '@nestjs/microservices';

@Injectable()
export class GatewayService {
  private client: ClientKafka;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'api-gateway',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'api-gateway-consumer',
        },
      },
    });
  }

  sendMessage(topic: string, message: any) {
    return this.client.emit(topic, message);
  }
}
