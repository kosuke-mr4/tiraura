export interface Memo {
  id: string;
  content: string;
  isChecked: boolean;
}

export interface Category {
  id: string;
  name: string;
  memos: Memo[];
}

export interface CategoryListProps {
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
  newCategoryName: string;
  onNewCategoryNameChange: (name: string) => void;
  onAddCategory: () => void;
  onDeleteCategory: (categoryId: string) => void;
  onUncheckAllMemos: (categoryId: string) => void;
}
