import { Injectable } from '@nestjs/common';
const { google } = require('googleapis');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

@Injectable()
export class DriveService {
  oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  filePath = path.join(__dirname, '/../../public/videos/video-demo.mp4');

  drive = google.drive({
    version: 'v3',
    auth: this.oauth2Client
  });

  constructor() {
    console.log('a');

    this.oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
  }

  async uploadFile(): Promise<void> {
    try {
      const resp = await this.drive.files.create({
        requestBody: {
          name: 'video-demo.mp4',
          parents: ['120qBSCri6UhM2_7Ronhu93SkyH1x7hT7'],
          mimeType: 'video/mp4'
        },
        media: {
          mimeType: 'video/mp4',
          body: fs.createReadStream(this.filePath)
        }
      });
      console.log(resp.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteFile(id): Promise<void> {
    try {
      const resp = await this.drive.files.delete({
        fileId: id
      });
      console.log(resp.data, resp.status);
    } catch (error) {
      console.log(error.message);
    }
  }

  async createFolder(): Promise<void> {
    try {
      const resp = await this.drive.files.create({
        requestBody: {
          name: 'Folder Main',
          mimeType: 'application/vnd.google-apps.folder'
        }
      });
      console.log(resp.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async createFolderInFolder(): Promise<void> {
    try {
      const resp = await this.drive.files.create({
        requestBody: {
          name: 'Folder Sub',
          parents: ['120qBSCri6UhM2_7Ronhu93SkyH1x7hT7'],
          mimeType: 'application/vnd.google-apps.folder'
        }
      });
      console.log(resp.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  async downloadFile(): Promise<void> {
    let filePath = path.join(
      __dirname,
      '/../../public/images/nghe-thuat-san-quy-va-nau-mi-download.jpg'
    );
    let dest = fs.createWriteStream(filePath);
    try {
      const resp = await this.drive.files.get(
        { fileId: '1v5bTU_v08yWYR_-x-wm1QGtRPxPbMYUI', alt: 'media' },
        { responseType: 'stream' },
        function (err, res: any) {
          console.log(res);

          res.data
            .on('end', () => {
              console.log('Done');
            })
            .on('error', err => {
              console.log('Error', err);
            })
            .pipe(dest);
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }

  async downloadVideo(): Promise<void> {
    let filePath = path.join(__dirname, '/../../public/videos/video-demo-12.mp4');
    let dest = fs.createWriteStream(filePath);
    try {
      const resp = await this.drive.files.get(
        { fileId: '1be0en51CaZpwK0QGjlK-cQgeryVNyqAD', alt: 'media' },
        { responseType: 'stream' },
        function (err, res: any) {
          console.log(res);

          res.data
            .on('end', () => {
              console.log('Done');
            })
            .on('error', err => {
              console.log('Error', err);
            })
            .pipe(dest);
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  }
}
