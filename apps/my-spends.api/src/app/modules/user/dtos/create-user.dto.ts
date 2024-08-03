import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Match } from "@shared/decorators/match";

export class CreateUserDTO {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @Match('password')
  confirmPassword: string;
}
