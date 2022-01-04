import { Injectable } from '@nestjs/common';

@Injectable()
export class TimeService {
  takeTime(time: number) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(() => {
          resolve(
            "API's call successfully, your reward is https://www.youtube.com/watch?v=0GeQVtZ6Rd4",
          );
        }, time * 1000);
      } catch (error) {
        reject(error);
      }
    });
  }
}
