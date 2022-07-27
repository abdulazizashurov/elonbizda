import { Schema, model } from 'mongoose';
import { CurrencyType } from '../../../domain/entities/poster/enums';
import { Poster } from '../../../domain/entities/poster/Poster';

const PosterSchema = new Schema<Poster>({
  title: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  exchange: Boolean,
  currency: {
    type: String,
    enum: Object.values(CurrencyType)
  },
  used: {
    type: Boolean,
    required: true
  },
  location: {
    map: {
      log: String,
      lat: String
    },
    address: String
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  agreement: {
    type: Boolean,
    default: true
  },
  additionalInformations: {
    type: Object,
    default: null
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  }
});

export default model<Poster>('posters', PosterSchema);
