import { Schema, model } from 'mongoose';
import { Category } from '../../../domain/entities/category/Category';
import CategoryForm from './CategoryForm';
const CategorySchema = new Schema<Category>({
  name: {
    type: String,
    required: true
  },
  icon: String, // category icon 64x64 | 128x128
  isHead: {
    type: Boolean,
    default: false
  }, // if is head be true this is main category
  children: [
    {
      ref: 'categories',
      type: String
    }
  ], // category childeren
  parent: {
    type: String,
    ref: 'categories'
  }, // parent category
  additionalInfoForms: {
    type: [CategoryForm],
    default: null
  }
});

export default model<Category>('categories', CategorySchema);
