import IParseTemplateTDO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProviders {
  parse(data: IParseTemplateTDO): Promise<string>;
}
