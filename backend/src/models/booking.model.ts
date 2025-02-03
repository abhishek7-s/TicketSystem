import { Column, Model, Table, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import { Event } from './event.model';
import { User } from './user.model';


@Table
export class Booking extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  bookingId: number;

  @ForeignKey(() => User)
  @Column
  userId: number; 

  @ForeignKey(() => Event)
  @Column
  eventId: number; 

  @Column({ type: DataType.DATEONLY, allowNull: false })
  bookingDate: Date;

  @BelongsTo(() => User) // ✅ Make sure User is associated
  user: User;

  @BelongsTo(() => Event) // ✅ Event association
  event: Event;
}
