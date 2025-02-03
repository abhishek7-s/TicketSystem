import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from 'src/models/event.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Event]),
    UserModule,
    AuthModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
