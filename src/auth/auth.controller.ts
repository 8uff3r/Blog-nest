import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { log } from "console";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { Cookies } from "./cookie.decorator";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { GetUser } from "./get-user.decorator";
import { User } from "./user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signup(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto) {
    return this.authService.signup(authCredentialsDto);
  }

  @Post("signin")
  async signin(
    @Body(ValidationPipe) authCredentuialsDto: AuthCredentialsDto,
    @Cookies("auth") auth: string,
    @Res({ passthrough: true }) res: Response,
    @Req() request: Request,
  ): Promise<{ accessToken: string }> {
    try {
      const { accessToken }: { accessToken: string } = await this.authService.signin(authCredentuialsDto);
      res.cookie("auth", accessToken);
      return { accessToken };
    } catch (error) {
      console.log(error);
      throw new HttpException(error, 400, { cause: new Error(error) });
    }
  }

  @Post("test")
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    log(user);
  }
}
