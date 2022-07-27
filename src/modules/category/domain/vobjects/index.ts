export interface CreateCategory {
  name: string;
  icon: string;
  isHead: boolean;
  parentId: string;
}

export type DeleteCategory = {
  id: string;
};

export type MainCreateCategory = {
  name: string;
  icon: string;
  isHead: boolean;
};

export type GetCategory = {
  id: string;
};

export type UpdateCategory = {
  name: string;
  icon: string;
  isHead: boolean;
  parentId: string;
};
