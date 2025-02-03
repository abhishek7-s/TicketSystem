import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { AdminGuard } from 'src/guard/admin.guard';
import { AuthGuard } from 'src/guard/auth.guard';
import { EventDto } from './dto/event.dto';

@UseGuards(AuthGuard)
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('/')
  getEvents(){
    return this.eventService.allEvents();
  }

  @Get('/info/:id')
  eventInfo(@Param('id', ParseIntPipe) eventId: number){
    return this.eventService.eventInfo(eventId);
  }

  @UseGuards(AdminGuard)
  @Post('/add')
  addEvent(@Body() data : EventDto){
    return this.eventService.addEvent(data);
  }

  @UseGuards(AdminGuard)
  @Delete('/delete/:id')
  deleteEvent(@Param('id', ParseIntPipe) id: number){
    return this.eventService.deleteEvent(id);
  }

  
}
