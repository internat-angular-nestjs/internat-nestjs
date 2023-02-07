import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/models/dto/user.dto';
import { User } from 'src/users/models/entities/user.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async valideuser(user: UserDto): Promise<any> {
    const post = await this.userRepository.findOne({
      where: {
        emailUser: user.emailUser,
      },
    });
    if (post) {
      const isMatch = await bcrypt.compare(
        user.passwordUser,
        post.passwordUser,
      );
      if (isMatch) {
        return user;
      }
    }
    throw new NotFoundException("user dosen't exist");
  }
  async loginUser(user: User) {
    const post = await this.valideuser(user);
    if (post) {
      const idUSer = await this.userRepository.findOne({
        where: {
          emailUser: user.emailUser,
        },
        select: ['id', 'nameUser', 'role'],
      });
      const payload = {
        nameUser: idUSer.nameUser,
        role: idUSer.role,
        sub: idUSer.id,
      };
      const token = this.jwtService.sign(payload);
      console.log('this is the token',token)
      const id = payload.sub;
      return {
        token,
        id,
      };
    } else {
      throw new NotFoundException('Email Or password is wrong !');
    }
  }
}
