import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  generete(user_id: string): Promise<UserToken>;
}
