import { User, UserCreateInput, UserInput } from "../../models";

export const USER_SERVICE = Symbol('USER_SERVICE');

export interface IUserService {
  create(user: UserCreateInput): Promise<UserInput>;
  findById(id: string): Promise<UserInput | null>;
  findByEmail(email: string): Promise<User | null>;
}
