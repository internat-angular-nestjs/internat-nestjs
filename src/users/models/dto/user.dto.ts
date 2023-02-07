import { IsEmail, IsString } from '@nestjs/class-validator';

export class UserDto {
  @IsString()
  familyUser?: string;

  @IsString()
  NameUser?: string;

  @IsEmail()
  emailUser?: string;

  @IsString()
  passwordUser?: string;

  @IsString()
  role?: string;

  @IsString()
  phoneNumber?: string;

  @IsString()
  signature?: string;

  dateOfBirth?: Date;
}
