// responsabilidade pelo formato dos dados
import { uuid } from 'uuidv4';

class Appointment {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Appointment, 'id'>) {
    // Omit(excluir a propriedade de dentro de um tipo): 1°tipo, 2° o q quero omitir, omito ID, pq gera sozinho
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;
