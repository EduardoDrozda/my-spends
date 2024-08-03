import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository, IUserService, USER_REPOSITORY } from './interfaces';
import { UserCreateInput, UserInput } from './models';

@Injectable()
export class UserService implements IUserService {
  private readonly USER_ALREADY_EXISTS = 'User already exists';

  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {}

  async create(user: UserCreateInput): Promise<UserInput> {
    const findedUser = await this.findByEmail(user.email);

    if (findedUser) {
      throw new BadRequestException(this.USER_ALREADY_EXISTS);
    }

    const { id, createdAt, updatedAt } = await this.userRepository.create(user);

    return { ...user, id, createdAt, updatedAt };
  }

  async findById(id: string): Promise<UserInput | null> {
    return this.userRepository.findById(id);
  }

  findByEmail(email: string): Promise<UserInput | null> {
    return this.userRepository.findByEmail(email);
  }
}
