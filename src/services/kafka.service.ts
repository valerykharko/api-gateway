import { Injectable } from "@nestjs/common";
import { Kafka, Consumer, Producer } from "kafkajs";

@Injectable()
export class KafkaService {
  private kafka = new Kafka({ brokers: ["localhost:9092"] });
  private consumer: Consumer = this.kafka.consumer({
    groupId: "gateway-group",
  });
  private producer: Producer = this.kafka.producer();

  async sendMessage(topic: string, message: string) {
    await this.producer.connect();
    await this.producer.send({
      topic,
      messages: [{ value: message }],
    });
  }

  async listenToTopic(topic: string, handler: (message: string) => void) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic });

    await this.consumer.run({
      eachMessage: async ({ message }) => {
        handler(message.value.toString());
      },
    });
  }
}
