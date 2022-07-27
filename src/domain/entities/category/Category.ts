import { CategoryForm } from '../categoryForms/CategoryForm';
export type Category = {
  id: string;
  name: string;
  icon?: string;
  isHead: boolean;
  children?: Category[];
  parent?: Category;
  additionalInfoForms?: CategoryForm[];
};
