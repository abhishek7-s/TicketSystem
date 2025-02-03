import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { BookingService } from './booking.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { BookingDto } from './dto/booking.dto';

@UseGuards(AuthGuard)
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('/bookEvent')
  bookEvent(@Body() data : BookingDto){
    return this.bookingService.bookEvent(data);
  }

  @Get('/ByUser/:userId')
  bookingByUser(@Param('userId', ParseIntPipe) userId: number){
    return this.bookingService.getBookingsByUser(userId)
  }

  @Get('/ByEvent/:eventId')
  bookingByEvent(@Param('eventId', ParseIntPipe) eventId: number){
    return this.bookingService.getBookingsByEvent(eventId)
  }
}
