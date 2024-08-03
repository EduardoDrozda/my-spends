import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Match } from "@shared/decorators/match";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDTO {

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  password: string;

  @Match('password')
  @ApiProperty({
    required: true,
  })
  confirmPassword: string;
}
