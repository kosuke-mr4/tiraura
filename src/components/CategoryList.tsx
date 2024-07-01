import React from "react";
import { CategoryListProps } from "../types";
import { Plus, X, CheckSquare } from "lucide-react";

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  newCategoryName,
  onNewCategoryNameChange,
  onAddCategory,
  onDeleteCategory,
  onUncheckAllMemos,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onAddCategory();
    }
  };

  return (
    <div className="col-span-1  p-4 rounded">
      <h2 className="text-xl font-semibold mb-4">カテゴリ</h2>
      <div className="flex mb-4">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => onNewCategoryNameChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="新しいカテゴリ名"
          className="flex-grow p-2 border rounded-l"
        />
        <button
          onClick={onAddCategory}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600 flex items-center justify-center"
          style={{ width: "40px", height: "40px" }}
        >
          <Plus size={24} />
        </button>
      </div>
      <ul className="mt-4">
        {categories.map((category) => (
          <li
            key={category.id}
            className={`cursor-pointer p-2 rounded flex justify-between items-center ${
              selectedCategory?.id === category.id
                ? "bg-blue-100"
                : "hover:bg-gray-200"
            }`}
            onClick={() => onSelectCategory(category)}
          >
            <span className="flex-grow">{category.name}</span>
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onUncheckAllMemos(category.id);
                }}
                className="text-green-500 hover:text-green-700 mr-2"
                title="全てのチェックを外す"
              >
                <CheckSquare size={16} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteCategory(category.id);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <X size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
