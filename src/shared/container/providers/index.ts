import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import DiskStorageProvider from './StorageProvider/implementantions/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvider';
import EtherealMailProvider from './MailProvider/implementantions/EtherealMailProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProviders';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlesbarMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider, // hj estatico, no futuro um caminho p desenvolvimento outro p produção
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(), // hj estatico, no futuro um caminho p desenvolvimento outro p produção
);

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider, // hj estatico, no futuro um caminho p desenvolvimento outro p produção
);
