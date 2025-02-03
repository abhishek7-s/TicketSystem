import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { BookingDto } from './dto/booking.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from 'src/models/booking.model';
import { Event } from 'src/models/event.model';
import { User } from 'src/models/user.model';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking)
    private readonly bookingModel: typeof Booking,

    @InjectModel(Event)
    private readonly eventModel: typeof Event,

    @InjectModel(User)
    private readonly userModel: typeof User,

  ){}

  async bookEvent(data : BookingDto){

    const user = await this.userModel.findByPk(data.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const event = await this.eventModel.findByPk(data.eventId);
    if (!event) {
      throw new Error('Event not found');
    }

    if (event.vacancy <= 0) {
      throw new Error('No available vacancies for this event');
    }

    await this.bookingModel.create({
      userId : data.userId,
      eventId : data.eventId,
      bookingDate : data.bookingDate
    })

    event.vacancy -= 1;
    await event.save();
    return "Booked successfully" 
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return this.bookingModel.findAll({ where: { userId } });
  }

  async getBookingsByEvent(eventId: number): Promise<Booking[]> {
    return this.bookingModel.findAll({ 
      where: { eventId },
      include: [
        {
          model: User, // Ensure User model is associated
          attributes: ['id', 'name', 'email'], // Fetch user details
        },
      ],
    });
  }
}
