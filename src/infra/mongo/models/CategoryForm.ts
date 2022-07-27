import { Schema } from 'mongoose';
import { FormType, FormElement } from '../../../domain/entities/categoryForms/enums';
import { CategoryForm } from '../../../domain/entities/categoryForms/CategoryForm';
const CategorySchema = new Schema<CategoryForm>({
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  description: String,
  formType: {
    type: String,
    enum: Object.values(FormType)
  },
  formElement: {
    type: String,
    enum: Object.values(FormElement)
  },
  exampleValue: {
    type: String,
    default: null
  },
  values: {
    type: Object,
    default: null
  },
  value: {
    type: String,
    default: null
  },
  editable: {
    type: Boolean,
    default: true
  },
  layout: {
    type: String
  },
  searchable: {
    type: Boolean,
    default: false
  },
  filterable: {
    type: Boolean,
    default: false
  }
});

// export default model<CategoryForm>('categoryForms', CategorySchema);
export default CategorySchema;
