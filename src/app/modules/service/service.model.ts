import { Schema, model } from 'mongoose';

import { IService, ServiceModel } from './service.interface';
// import { format } from 'date-fns';

const serviceSchema = new Schema<IService, ServiceModel>(
  {
    title: { type: String,  },
    price: { type: Number,  },
    image: { type: String,  },
    description: { type: String,  },
    address: { type: String,  },
    contact: { type: String,  },
    publisher: { type: String, ref: 'User' },
    availableTickets: { type: Number,  },
    serviceDate: { type: String,  },
    category: { type: Schema.Types.ObjectId, ref: 'Category',  },
    status: { type: String,},

  },
  {
    timestamps: true,
    // strict: 'throw',
    toJSON: {
      virtuals: true,
    },
  }
);


export const Service = model<IService, ServiceModel>('Service', serviceSchema);
