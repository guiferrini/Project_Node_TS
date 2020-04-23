// responsabilidade pelo formato dos dados
// import { uuid } from 'uuidv4'; qdo usava o constructor
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('time with time zone')
  date: Date;

  // COnstructor é p class, mas p entidade do typeorm n necessita, ele cria 'automática'
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  // Omit(excluir a propriedade de dentro de um tipo): 1°tipo, 2° o q quero omitir, omito ID, pq gera sozinho
  // this.id = uuid();
  // this.provider = provider;
  // this.date = date;
  // }
}

export default Appointment;
