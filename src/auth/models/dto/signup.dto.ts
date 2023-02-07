import { IsEmail, IsNotEmpty } from "@nestjs/class-validator";

export class AuthUserDto  { 
  
  @IsEmail()
  readonly emailUser?: string;
  
  @IsNotEmpty()
  readonly passwordUser?: string;
}
