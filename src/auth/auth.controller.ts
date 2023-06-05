import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { log } from "console";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { Cookies } from "./decorators/cookie.decorator";
import { GetUser } from "./decorators/get-user.decorator";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  signup(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto, @Res({ passthrough: true }) res: Response) {
    try {
      this.authService.signup(authCredentialsDto);
      return res.redirect("/signin");
    } catch (error) {
    }
  }

  @Post("signin")
  async signin(
    @Body(ValidationPipe) authCredentuialsDto: AuthCredentialsDto,
    @Cookies("auth") auth: string,
    @Res({ passthrough: true }) res: Response,
    @Req() request: Request,
  ) {
    try {
      const { accessToken }: { accessToken: string } = await this.authService.signin(authCredentuialsDto);
      res.cookie("auth", accessToken);
      // return { accessToken };
      return res.redirect("/home");
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
