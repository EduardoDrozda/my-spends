import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';

import { AUTH_SERVICE, IAuthService } from '@modules/auth/application/services';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetAuthDTO } from '../../dtos';
import { CreateAuthDTO } from '../../dtos';
import { Public } from '@shared/decorators';

@ApiTags('Login')
@Controller('login')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE) private readonly authService: IAuthService
  ) { }

  @Post()
  @Public()
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
