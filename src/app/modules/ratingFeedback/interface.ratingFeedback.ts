import { Model } from 'mongoose';
import { IUser } from '../users/users.interface';
import { IBooking } from '../booking/booking.interface';
import { IService } from '../service/service.interface';

export type IRatingFeedBackFilters = {
  searchTerm?: string;
  title?: string;
  status?: string;
};

export type IRatingFeedBack = {
  feedback?: string;
  rating: number;
  user:IUser | string;
  booking:IBooking | string
  service:IService | string
  status?: string;
};

export type RatingFeedBack = Model<IRatingFeedBack, Record<string, unknown>>;
