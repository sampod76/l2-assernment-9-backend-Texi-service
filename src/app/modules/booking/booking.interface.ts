import mongoose, { Model } from 'mongoose';

import { IService } from '../service/service.interface';
import { IUser } from '../users/users.interface';
import { IRatingFeedBack } from '../ratingFeedback/interface.ratingFeedback';
export type IBookingFilters = {
  searchTerm?: string;
  status?: string;
  category?: string;
  availableTickets?: string;
  price?: number;
};
export type IBookingStatusType = 'pending' | 'accept' | 'reject' | 'complete'|'cancel';

export type IBooking = {
  service:mongoose.Schema.Types.ObjectId | IService |string;
  userName?: string;
  phoneNumber: string;
  note?: string;
  address: string;
  googleMapLink?: string;
  bookingDate: string;
  authorityNote?: string;
  time?: string;
  bookingTickets: number;
  payment?: boolean;
  totalBalance?: number;
  status?: IBookingStatusType;
  user: string | IUser;
  ratingFeedback?: string | IRatingFeedBack;

};

export type BookingModel = Model<IBooking, Record<string, unknown>>;
