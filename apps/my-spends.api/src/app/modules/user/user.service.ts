import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository, IUserService, USER_REPOSITORY } from './interfaces';
import { User, UserCreateInput, UserInput } from './models';
import { HASH_SERVICE, IHashService } from '@shared/services';

@Injectable()
export class UserService implements IUserService {
  private readonly USER_ALREADY_EXISTS = 'User already exists';

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService
  ) {}

  async create(user: UserCreateInput): Promise<UserInput> {
    const findedUser = await this.findByEmail(user.email);

    if (findedUser) {
      throw new BadRequestException(this.USER_ALREADY_EXISTS);
    }

    user.password = await this.hashService.hash(user.password);
    const { id, name, email, createdAt, updatedAt } = await this.userRepository.create(user);
    return { id, name, email,  createdAt, updatedAt };
  }

  async findById(id: string): Promise<UserInput | null> {
    return this.userRepository.findById(id);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
