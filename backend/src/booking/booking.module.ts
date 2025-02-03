import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from 'src/models/booking.model';
import { User } from 'src/models/user.model';
import { Event } from 'src/models/event.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Booking, User, Event]), 
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
