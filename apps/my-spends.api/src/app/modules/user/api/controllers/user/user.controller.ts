import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { IUserService, USER_SERVICE } from '@modules/user/application/services';
import { CreateUserDTO, GetUserDTO } from '../../dtos';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '@shared/decorators';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(@Inject(USER_SERVICE) private readonly userService: IUserService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: GetUserDTO,
    example: {
      id: '1',
      name: 'John Doe',
      email: 'email@email.com',
      createdAt: '2021-09-01T00:00:00.000Z',
      updatedAt: '2021-09-01T00:00:00.000Z',
    }
  })
  async create(@Body() payload: CreateUserDTO): Promise<GetUserDTO> {
    return this.userService.create(payload);
  }
}
