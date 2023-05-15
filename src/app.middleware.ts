import { Injectable } from "@nestjs/common";
import { UserRepository } from "./auth/user.repository";

@Injectable()
export class isAuthed {
  constructor(private readonly userRepository: UserRepository) {}
}
