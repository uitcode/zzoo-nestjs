import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  getTodo(): string {
    return 'Todo Loading...';
  }
}
