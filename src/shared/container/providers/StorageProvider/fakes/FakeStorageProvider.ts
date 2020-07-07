// Salva o Avatar em um Array e não no disco
import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const fileIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    this.storage.splice(fileIndex, 1); // na posição filename, qdade: 1 unidade
  }
}

export default FakeStorageProvider;
