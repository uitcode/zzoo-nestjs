import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'fs';
const path = require('path');

@Injectable()
export class UploadService {
  async upLoadFile(file: any): Promise<void> {
    try {
      let filePath = path.join(__dirname, '/../../storage/no-name.ts');
      const ws = createWriteStream(filePath);
      ws.write(file.buffer);
      console.log(file);
    } catch (error) {
      console.log(error.message);
    }
  }
}
