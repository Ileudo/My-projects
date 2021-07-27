import path from 'path';
import fs from 'fs';

class FileService {
  saveAudio(audio, categoryName) {
    try {
      const fileName = audio.name;
      const folderName = `assets/audio/${categoryName}`;
      try {
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName);
        }
      } catch (err) {
        console.error(err);
      }
      const filePath = path.resolve(`assets/audio/${categoryName}`, fileName);
      audio.mv(filePath);
      return fileName;
    } catch (error) {
      console.log(error);
    }
  }

  saveImage(img, categoryName) {
    try {
      const fileName = img.name;
      const folderName = `assets/images/${categoryName}`;
      try {
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName);
        }
      } catch (err) {
        console.error(err);
      }
      const filePath = path.resolve(`assets/images/${categoryName}`, fileName);
      console.log(filePath);
      img.mv(filePath);
      return fileName;
    } catch (error) {
      console.log(error);
    }
  }
}

export const fileService = new FileService();
