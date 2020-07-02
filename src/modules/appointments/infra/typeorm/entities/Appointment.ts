// responsabilidade pelo formato dos dados
// import { uuid } from 'uuidv4'; qdo usava o constructor
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User) // mtos agendamentos p 1 usuario
  // Uma função q retorna qual é o model q deve utilizar qdo a variavel for chamada
  @JoinColumn({ name: 'provider_id' })
  // Qual coluna vai identificar qual q eh o usuario do agendamento
  provider: User;

  @Column('time with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // COnstructor é p class, mas p entidade do typeorm n necessita, ele cria 'automática'
  // constructor({ provider, date }: Omit<Appointment, 'id'>) {
  // Omit(excluir a propriedade de dentro de um tipo): 1°tipo, 2° o q quero omitir, omito ID, pq gera sozinho
  // this.id = uuid();
  // this.provider = provider;
  // this.date = date;
  // }
}

export default Appointment;
