import { Injectable } from "@nestjs/common";
import { EventsService } from "src/events.service";
import { BPost } from "./post.entity";

@Injectable()
export class PostEvent {
  constructor(private readonly eventService: EventsService) {}

  postCreated(post: BPost) {
    return this.eventService.emit("postCreated", { message: post.title });
  }
}
