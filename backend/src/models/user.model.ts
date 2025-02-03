import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Booking } from './booking.model';

@Table
export class User extends Model {

  @Column({ primaryKey: true, autoIncrement: true })
  id: number;
  
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  isAdmin: boolean;

  @HasMany(() => Booking)
  bookings: Booking[];
}