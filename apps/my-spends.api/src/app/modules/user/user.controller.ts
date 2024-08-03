import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { IUserService, USER_SERVICE } from './interfaces';
import { CreateUserDTO } from './dtos';

@Controller('user')
export class UserController {
  constructor(@Inject(USER_SERVICE) private readonly userService: IUserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUserDTO) {
    return this.userService.create(payload);
  }
}
