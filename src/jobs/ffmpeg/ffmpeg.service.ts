import { Injectable } from '@nestjs/common';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const path = require('path');
const fs = require('fs');
const { google } = require('googleapis');

@Injectable()
export class FfmpegService {
  oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  drive = google.drive({
    version: 'v3',
    auth: this.oauth2Client
  });

  constructor() {
    this.oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
  }

  // checkVideo(): void {
  //   try {
  //     let filePath = path.join(__dirname, '/../../public/videos/video-demo.mp4');
  //     new ffmpeg(filePath, function (err, video) {
  //       if (!err) {
  //         console.log('The video is ready to be processed');
  //       } else {
  //         console.log('Error: ' + err);
  //       }
  //     });
  //   } catch (e) {
  //     console.log(e.code);
  //     console.log(e.msg);
  //   }
  // }

  async cutVideo() {
    let filePathGoogle = path.join(__dirname, '/../../public/videos/video-demo-google.mp4');
    let dest = fs.createWriteStream(filePathGoogle);

    await this.drive.files.get(
      { fileId: '1gVzRQyATuvFAs1Vsh0pNGBysclPcoNuh', alt: 'media' },
      { responseType: 'stream' },
      function (err, res: any) {
        console.log(res);
        let filePathOut = path.join(__dirname, '/../../public/videos/o-S01E02-cut.mkv');
        let outStream = fs.createWriteStream(filePathOut);
        res.data
          .on('end', () => {
            console.log('Done');
          })
          .on('error', err => {
            console.log('Error', err);
          })
          .pipe(dest);

        ffmpeg(res.data)
          .format('matroska')
          .outputOptions(['-ss 00:00:00', '-to 00:02:00', '-c copy'])
          .output(outStream)
          .on('end', function (err) {
            if (!err) {
              console.log('conversion Done');
            }
          })
          .on('error', function (err) {
            console.log('error: ', err);
          })
          .run();
      }
    );

    // let filePath = path.join(__dirname, '/../../public/videos/o-S01E02.mp4');
    let filePath = fs.createReadStream(
      path.join(__dirname, '/../../public/videos/video-demo-google.mp4')
    );
  }
}
