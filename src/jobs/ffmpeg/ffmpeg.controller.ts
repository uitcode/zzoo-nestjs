import { Controller, Get } from '@nestjs/common';
import { FfmpegService } from './ffmpeg.service';

@Controller('api/v1/ffmpeg')
export class FfmpegController {
  constructor(private readonly ffmpegService: FfmpegService) {}

  @Get()
  getDrive(): object {
    this.ffmpegService.cutVideo();
    return {
      name: 'Duc Duy'
    };
  }
}
