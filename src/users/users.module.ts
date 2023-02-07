import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/entities/user.entity';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports:[TypeOrmModule.forFeature([User]),UserService]
})
export class UserModule {}
