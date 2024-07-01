import React, { useState, useEffect } from "react";
import { Category } from "../types";
import CategoryList from "./CategoryList";
import MemoList from "./MemoList";
import ConfirmDialog from "./ConfirmDialog";

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : [];
  });
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newMemoContent, setNewMemoContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  useEffect(() => {
    console.log("Saving categories to localStorage:", categories);
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const addCategory = () => {
    if (newCategoryName.trim()) {
      const newCategory = {
        id: Date.now().toString(),
        name: newCategoryName,
        memos: [],
      };
      setCategories((prevCategories) => [...prevCategories, newCategory]);
      setNewCategoryName("");
      setSelectedCategory(newCategory);
    }
  };

  const confirmDeleteCategory = (categoryId: string) => {
    setCategoryToDelete(categoryId);
    setShowConfirmDialog(true);
  };

  const deleteCategory = () => {
    if (categoryToDelete) {
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== categoryToDelete)
      );
      if (selectedCategory && selectedCategory.id === categoryToDelete) {
        setSelectedCategory(null);
      }
      setCategoryToDelete(null);
      setShowConfirmDialog(false);
    }
  };

  const addMemo = () => {
    if (selectedCategory && newMemoContent.trim()) {
      const newMemo = {
        id: Date.now().toString(),
        content: newMemoContent,
        isChecked: false,
      };
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === selectedCategory.id
            ? { ...category, memos: [...category.memos, newMemo] }
            : category
        )
      );
      setNewMemoContent("");
      setSelectedCategory((prevSelected) =>
        prevSelected
          ? { ...prevSelected, memos: [...prevSelected.memos, newMemo] }
          : null
      );
    }
  };

  const deleteMemo = (categoryId: string, memoId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              memos: category.memos.filter((memo) => memo.id !== memoId),
            }
          : category
      )
    );
    if (selectedCategory && selectedCategory.id === categoryId) {
      setSelectedCategory((prevSelected) =>
        prevSelected
          ? {
              ...prevSelected,
              memos: prevSelected.memos.filter((memo) => memo.id !== memoId),
            }
          : null
      );
    }
  };

  const toggleMemoCheck = (categoryId: string, memoId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              memos: category.memos.map((memo) =>
                memo.id === memoId
                  ? { ...memo, isChecked: !memo.isChecked }
                  : memo
              ),
            }
          : category
      )
    );
    if (selectedCategory && selectedCategory.id === categoryId) {
      setSelectedCategory((prevSelected) =>
        prevSelected
          ? {
              ...prevSelected,
              memos: prevSelected.memos.map((memo) =>
                memo.id === memoId
                  ? { ...memo, isChecked: !memo.isChecked }
                  : memo
              ),
            }
          : null
      );
    }
  };

  const uncheckAllMemos = (categoryId: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              memos: category.memos.map((memo) => ({
                ...memo,
                isChecked: false,
              })),
            }
          : category
      )
    );
    if (selectedCategory && selectedCategory.id === categoryId) {
      setSelectedCategory((prevSelected) =>
        prevSelected
          ? {
              ...prevSelected,
              memos: prevSelected.memos.map((memo) => ({
                ...memo,
                isChecked: false,
              })),
            }
          : null
      );
    }
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-4 border-b">
        <h1 className="text-3xl font-semibold">tiraura</h1>
      </header>
      <main className="flex-grow flex overflow-hidden">
        <div className="w-1/3 p-4 border-r overflow-y-auto">
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            newCategoryName={newCategoryName}
            onNewCategoryNameChange={setNewCategoryName}
            onAddCategory={addCategory}
            onDeleteCategory={confirmDeleteCategory}
            onUncheckAllMemos={uncheckAllMemos}
          />
        </div>
        <div className="w-2/3 p-4 overflow-y-auto">
          <MemoList
            selectedCategory={selectedCategory}
            newMemoContent={newMemoContent}
            onNewMemoContentChange={setNewMemoContent}
            onAddMemo={addMemo}
            onDeleteMemo={deleteMemo}
            onToggleMemoCheck={toggleMemoCheck}
          />
        </div>
      </main>
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={deleteCategory}
        message="このカテゴリを削除してもよろしいですか？"
      />
    </div>
  );
};

export default App;
