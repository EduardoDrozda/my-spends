import { User, UserCreateInput } from "@modules/user/application/models";
import { IUserRepository } from "@modules/user/application/repositories";
import { knex } from "@database/index";


export class UserRepository implements IUserRepository {
  async create({ email, name, password }: UserCreateInput): Promise<User> {
    return knex('users')
      .insert({
        email,
        name,
        password,
      })
      .returning(['id', 'name', 'email', 'created_at', 'updated_at']);
  }

  async findById(id: string): Promise<User | null> {
    return knex('users').where({ id }).first();
  }

  findByEmail(email: string): Promise<User | null> {
    return knex('users')
      .whereRaw('LOWER(email) = ?', email.toLowerCase())
      .first();
  }
}
