import type { Login } from 'src/entities/login.entity';

export interface ILoginRepository {
  create(login: Login): Promise<Login>;
  findByEmail(email: string): Promise<Login | null>;
}
