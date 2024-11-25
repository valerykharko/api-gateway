import { Controller, Post, Body, UseGuards } from "@nestjs/common";
import { GatewayService } from "./gateway.service";
import { JwtAuthGuard } from "../../../../../libs/common/src";

@Controller("gateway")
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @UseGuards(JwtAuthGuard)
  @Post("order")
  createOrder(@Body() orderData: any) {
    return this.gatewayService.sendRequestToOrder(orderData);
  }
}
