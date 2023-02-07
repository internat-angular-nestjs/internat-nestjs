import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './guards/constant';
import { JwtStrategy } from './guards/jwt.strategy';
import { User } from '../users/models/entities/user.entity';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService,JwtStrategy],
  imports: [CommonModule,TypeOrmModule.forFeature([User]),PassportModule,JwtModule.registerAsync
  ({
    imports: [ConfigModule],
    useFactory: async () => ({
      secret:jwtConstants.secret,
      signOptions: {
        expiresIn: '3600s',
      },
    }),
    inject: [ConfigService],
  }),
],
  exports:[AuthenticationService]
})
export class AuthenticationModule {}
