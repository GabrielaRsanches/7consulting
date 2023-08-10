export type Guid = string;

export interface Category {
  id: Guid;
  name: string;
}

export interface CategoryDetailsProps {
  category: Category;
  onUpdateUser: (updatedUser: Category) => void;
}
