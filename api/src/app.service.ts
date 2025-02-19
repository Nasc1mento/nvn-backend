import { Injectable } from '@nestjs/common';


class HealthMessage {
  timestamp: string;
  message: string;
}


@Injectable()
export class AppService {
  getHello(): HealthMessage {
    return {
      timestamp: new Date().toISOString(),
      message: "I'm OK"
    }
  }
}
