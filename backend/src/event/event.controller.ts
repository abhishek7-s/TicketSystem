import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { EventService } from './event.service';
import { AdminGuard } from 'src/guard/admin.guard';
import { AuthGuard } from 'src/guard/auth.guard';
import { EventDto } from './dto/event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

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
  @UseInterceptors(FileInterceptor('file' , {
    storage: diskStorage({
      destination: './uploads/events',
      filename: (req , file , cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + file.originalname);
      }
    })
  }))
  addEvent(@Body() data : EventDto, @UploadedFile() file: Express.Multer.File){
    return this.eventService.addEvent(data, file);
  }

  

  @UseGuards(AdminGuard)
  @Delete('/delete/:id')
  deleteEvent(@Param('id', ParseIntPipe) id: number){
    return this.eventService.deleteEvent(id);
  }

  @UseGuards(AdminGuard)
  @Post('/upload')
  uploadImg(@UploadedFile() file: Express.Multer.File){
    return this.eventService.uploadImage(file);
  }

  
}
