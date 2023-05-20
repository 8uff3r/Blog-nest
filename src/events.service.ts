// events.service.ts
import { Injectable } from "@nestjs/common";
import { EventEmitter } from "events";
import { fromEvent } from "rxjs";
import { PostEvent } from "./posts/post-events.service";

@Injectable()
export class EventsService {
  private readonly emitter = new EventEmitter();

  subscribe(channel: string) {
    return fromEvent<PostEvent>(this.emitter, channel);
  }

  emit(channel: string, data?: object) {
    this.emitter.emit(channel, { data });
  }
}
