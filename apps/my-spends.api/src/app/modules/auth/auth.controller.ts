import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { AUTH_SERVICE, IAuthService } from './interfaces';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAuthDTO } from './dtos';
import { CreateAuthDTO } from './dtos';

@ApiTags('Login')
@Controller('login')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService
  ) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate a registrated user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: GetAuthDTO,
    example: {
      token: 'token',
      type: 'token_type'
    },
  })
  async login(@Body() payload: CreateAuthDTO): Promise<GetAuthDTO> {
    return this.authService.login(payload);
  }
}
