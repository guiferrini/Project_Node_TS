import fs from 'fs'; // fs = file sistem do node
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      // rename - mover arquivo de um lado p outro
      path.resolve(uploadConfig.tmpFolder, file), // pasta tmp - de onde vem
      path.resolve(uploadConfig.uploadFolder, file), // p onde vai
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadFolder, file);

    try {
      await fs.promises.stat(filePath); // tras informações sobre o arquivo, se n encontra arquivo volta erro
    } catch {
      return;
    }

    await fs.promises.unlink(filePath); // deleta arquivo
  }
}

export default DiskStorageProvider;
