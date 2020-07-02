// vai utilzar para fluxo padrao da aplicação de rota
class AppError {
  public readonly message: string;

  public readonly statusCode: number; // 400, 300, ...

  constructor(message: string, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
