import IParseMailTEmplateTDO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProviders';

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ template }: IParseMailTEmplateTDO): Promise<string> {
    return template;
  }
}

export default FakeMailTemplateProvider;
