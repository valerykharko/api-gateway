import { Injectable } from "@nestjs/common";
import { KafkaService } from "./kafka.service";

@Injectable()
export class TokenValidationService {
  constructor(private readonly kafkaService: KafkaService) {}

  async validateToken(token: string) {
    await this.kafkaService.sendMessage("validate-token-request", token);

    return new Promise((resolve, reject) => {
      this.kafkaService.listenToTopic(
        "validate-token-response",
        (message: string) => {
          const response = JSON.parse(message);
          if (response.token === token) {
            resolve(response.isValid);
          } else {
            reject(new Error("Invalid token response"));
          }
        },
      );
    });
  }
}
