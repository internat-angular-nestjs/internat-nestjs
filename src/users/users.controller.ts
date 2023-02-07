import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/common/roles/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserDto } from './models/dto/user.dto';
import { User } from './models/entities/user.entity';
import { UserService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles( 'admin')
  @Get('getusers')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles('super admin', 'admin')
  @Post('add')
  create(@Body() user: UserDto): Promise<UserDto> {
    return this.userService.create(user);
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super admin')
  @Delete('delete/:id')
  async remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('getuser/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('super admin', 'admin')
  @Patch('updateuser/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UserDto) {
    return this.userService.updateUser(+id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('checkpassword/:id')
  async checkPassword(@Param('id') id: number, @Body() user: User) {
    return await this.userService.checkPassword(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateuserPassword/:id')
  updatePassword(@Param('id') id: number, @Body() user: User) {
    return this.userService.updatePassword(id, user);
  }
}
