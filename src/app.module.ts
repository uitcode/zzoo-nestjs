import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriveModule } from './jobs/drive/drive.module';
import { FfmpegModule } from './jobs/ffmpeg/ffmpeg.module';
import { TodoModule } from './jobs/todo/todo.module';

@Module({
  imports: [TodoModule, DriveModule, FfmpegModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
