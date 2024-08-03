import { knex } from "../../database";
import { IUserRepository } from "./interfaces";
import { UserCreateInput, User } from "./models";

export class UserRepository implements IUserRepository {
  async create(user: UserCreateInput): Promise<User> {
    return knex("users").insert(user).returning(['id', 'name', 'email', 'createdAt', 'updatedAt']);
  }

  async findById(id: string): Promise<User | null> {
    return knex("users").where({ id }).first();
  }

  findByEmail(email: string): Promise<User | null> {
    return knex("users").whereRaw("LOWER(email) = ?", email.toLowerCase()).first();
  }

}
