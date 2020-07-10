interface ITemplateVariables {
  [keys: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  file: string; // o arquivo da minha template
  variables: ITemplateVariables;
}
