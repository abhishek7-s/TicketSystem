import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Event } from 'src/models/event.model';
import { EventDto } from './dto/event.dto';

@Injectable()
export class EventService {

    constructor(
        @InjectModel(Event)
        private readonly eventModel: typeof Event,
    ){}

    helloWorld(){
        return "Hello events"
    }

    allEvents(){
        return this.eventModel.findAll()
    }

    async eventInfo(eventId: number){
        const info = await this.eventModel.findByPk(eventId)
        if(!info){
            return "Event not Found"
        }
        return info
    }

    async addEvent(data : EventDto){
        await this.eventModel.create({
            event_name : data.event_name,
            intake : data.intake,
            vacancy: data.vacancy,
            venue: data.venue,
            date : data.date
        })

        return "Event Added"
    }

    async deleteEvent(id){
        await this.eventModel.destroy({
            where: {eid : id}
        })    
        return "deleted event"
    }
}
