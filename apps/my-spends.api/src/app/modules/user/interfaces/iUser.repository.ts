import { User, UserCreateInput } from "../models";

export const USER_REPOSITORY = Symbol("IUserRepository");

export interface IUserRepository {
  create(user: UserCreateInput): Promise<User>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
