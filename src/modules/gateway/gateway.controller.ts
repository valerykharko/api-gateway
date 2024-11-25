import { Controller, Get } from '@nestjs/common';

@Controller('gateway')
export class GatewayController {
  @Get('/health')
  checkHealth(): string {
    return 'API Gateway is operational';
  }
}
