import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './auth/authentication.module';
import { CommonModule } from './auth/common/common.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'root',
        database: 'badisnaceur',
        autoLoadEntities: true,
        synchronize: true,
        charset: 'utf8mb4_unicode_ci',
      }),
    }),
    ConfigModule.forRoot({isGlobal:true,}),
    AuthenticationModule,
    UserModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
