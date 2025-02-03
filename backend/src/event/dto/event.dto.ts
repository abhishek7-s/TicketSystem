import { IsNotEmpty, IsString, IsInt, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class EventDto {
  @IsNotEmpty()
  @IsString()
  event_name: string;

  @IsNotEmpty()
  @IsInt()
  intake: number;

  @IsNotEmpty()
  @IsInt()
  vacancy: number;

  @IsNotEmpty()
  @IsString()
  venue: string;

  @IsNotEmpty()
  @Type(() => Date) 
  @IsDate()
  date: Date;
}