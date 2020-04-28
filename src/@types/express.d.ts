// modificando um tipo especifico de biblioteca, definição de tipos
declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
  }
}
