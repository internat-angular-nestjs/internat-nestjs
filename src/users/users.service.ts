import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/entities/user.entity';
import { UserDto } from './models/dto/user.dto';

@Injectable()
export class UserService {
    private saltRounds = 10;
    constructor( @InjectRepository(User)
    private userRepository: Repository<User>
){}

    async create(users: UserDto): Promise<UserDto> {
        users.passwordUser = await bcrypt.hash(users.passwordUser, this.saltRounds);
        const usersEntity: User = this.userRepository.create(users);
        return await this.userRepository.save(usersEntity);
      }
    
      async findOne(emailUser: string): Promise<User> {
        return await this.userRepository.findOne({
          where: {
            emailUser: emailUser,
          },
          select: ['passwordUser'],
        });
      }
    
      findAll(): Promise<User[]> {
        return this.userRepository.find();
      }
    
      async getUserById(id: number) {
        const post = await this.userRepository.findOne({ where: { id:id }});
        if (post) {
          return post;
        }
        return 'This user is not found';
      }
    
      async remove(id: number) {
    //     const conge= await this.congeRepository.find({where:{userId:id}})
    //    if(conge.length=0)
    //    {
    //     await this.congeRepository.delete(conge.map(elem=>elem.id))
    //    }
       
        return await this.userRepository.delete(id);
      }
    
      async updateUser(id: number, updateUserDto: UserDto) {
        await this.userRepository.update(id, updateUserDto);
        const updatedUser = await this.userRepository.findOne({ where: { id: id }});
        if (updatedUser) {
          return updatedUser;
        } else {
          return 'will you check again the id please ! ';
        }
      }
    
      async checkPassword(id: number, user: User) {
        const post = await this.userRepository.findOne({ where: { id: id }, select: ['passwordUser'] });
        if (post) {
          const isMatch = await bcrypt.compare(
            user.passwordUser,
            post.passwordUser,
          );
          if (isMatch) {
            return user;
          }
        }
        throw new NotFoundException("wrong password");
      }
    
      async updatePassword(id: number, user: User) {
        const post = await this.userRepository.findOne({ where: { id: id } });
        post.passwordUser = await bcrypt.hash(user.passwordUser, this.saltRounds);
        return await this.userRepository.save({ ...post })
      }
}
