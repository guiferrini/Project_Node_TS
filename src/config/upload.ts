import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp'); // onde os arquivos vão ser de imagens armazenados, pasta tmp fora da raiz pq n tem codigo

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    // dirmane ref ao diretorio q o arq está, tenho o caminho inteiro até a pasta config; depois vou adicionando ate a pasta tmp
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
