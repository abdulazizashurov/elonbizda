import { FormElement, FormType } from '../../../../domain/entities/categoryForms/enums';

export interface RemoveCategroyForm {
  id: string;
}

export interface CreateCategoryForm {
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
}

export interface CategoryFormElement {
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
}
