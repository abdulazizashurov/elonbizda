import { FormElement, FormType } from './enums';
export type CategoryForm = {
  name: string;
  displayName: string;
  description: string;
  formType: FormType;
  formElement: FormElement;
  exampleValue?: string;
  values?: any;
  value?: string;
  editable: boolean;
  layout: string;
  searchable: boolean;
  filterable: boolean;
};
