import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { TokenValidationService } from "../../services/token-validation.service";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly tokenValidationService: TokenValidationService,
  ) {}

  @Post("validate-token")
  async validateToken(@Body() body: { token: string }) {
    try {
      const isValid = await this.tokenValidationService.validateToken(
        body.token,
      );
      if (isValid) {
        return { message: "Token is valid" };
      } else {
        throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED);
      }
    } catch (error) {
      throw new HttpException(
        "Error validating token",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
