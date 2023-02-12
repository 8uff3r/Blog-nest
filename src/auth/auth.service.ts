import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {

  signup() {
    return "sing up"
  }
  signin() {
    return "sing in"
  }
}
