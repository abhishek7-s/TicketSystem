import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Booking } from './booking.model';

@Table
export class Event extends Model {

  @Column({ primaryKey: true, autoIncrement: true })
  eid: number;
  
  @Column
  event_name: string;

  @Column
  intake: number;

  @Column
  vacancy: number;

  @Column
  venue: string;

  @Column
  coverImageUrl: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  date: Date;

  @HasMany(() => Booking)
  bookings: Booking[];
}