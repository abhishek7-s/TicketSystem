import { IsBoolean, IsNumber, IsDate } from "class-validator"
import { Type } from 'class-transformer';

export class BookingDto {
    @IsNumber()
    userId : number;

    @IsNumber()
    eventId : number;

    @IsDate()
    @Type(() => Date) 
    bookingDate : Date;
}
