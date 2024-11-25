import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { KafkaService } from '../../services/kafka.service';

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);

  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: ClientProxy,
    @Inject('ORDER_SERVICE') private readonly orderService: ClientProxy,
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    private readonly kafkaService: KafkaService,
  ) {
    this.listenForTokenValidationResponses();
  }

  async sendRequestToAuth(data: any) {
    return this.authService.send({ cmd: 'auth' }, data);
  }

  async sendRequestToOrder(data: any) {
    return this.orderService.send({ cmd: 'create-order' }, data);
  }

  async sendTokenForValidation(token: string) {
    await this.kafkaService.sendMessage('validate-token-request', token);
    this.logger.log(`Запрос на проверку токена отправлен в Kafka: ${token}`);
  }

  private async listenForTokenValidationResponses() {
    await this.kafkaService.listenToTopic(
      'validate-token-response',
      (message: string) => {
        const { token, isValid } = JSON.parse(message);
        this.logger.log(
          `Ответ на проверку токена: ${token} - ${isValid ? 'валидный' : 'невалидный'}`,
        );
        // Логика обработки результата
      },
    );
  }
}
