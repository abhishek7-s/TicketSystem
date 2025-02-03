import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'ep-white-silence-a5vd3eht.us-east-2.aws.neon.tech',
      port: 5432, // Default PostgreSQL port
      username: 'test_owner',
      password: 'WUxdXg29AqoY',
      database: 'ticketApp',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // Set to true if you have a valid certificate
        },
      },
      autoLoadModels: true,
      synchronize: true, // Set to false in production
    }),
    EventModule,
    UserModule,
    BookingModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
