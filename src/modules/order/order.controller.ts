import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { JwtAuthGuard } from "../../../../../libs/common/src";

@Controller("orders")
export class OrderController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getOrder(@Req() req) {
    return { userId: req.user.sub, orderData: "Order details" };
  }
}
