import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { DriveService } from './drive.service';
require('dotenv').config();

@Controller('api/v1/drive')
export class DriveController {
  constructor(private readonly driveService: DriveService) {}

  @Get()
  getDrive(): object {
    this.driveService.downloadVideo();
    return {
      name: 'Duc Duy',
      apiKey: process.env.CLIENT_ID
    };
  }

  @Post()
  postDrive(): object {
    return this.driveService.uploadFile().then(res => {
      return {
        name: 'Duc Duy',
        apiKey: process.env.CLIENT_ID
      };
    });
  }

  @Delete()
  deleteDrive(@Body() body: any): object {
    this.driveService.deleteFile(body.id);
    return {
      name: 'Duc Duy',
      apiKey: process.env.CLIENT_ID,
      id: body.id
    };
  }
}
