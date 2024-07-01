import React from "react";
import { Category, Memo } from "../types";
import { Plus, X } from "lucide-react";

interface MemoListProps {
  selectedCategory: Category | null;
  newMemoContent: string;
  onNewMemoContentChange: (content: string) => void;
  onAddMemo: () => void;
  onDeleteMemo: (categoryId: string, memoId: string) => void;
  onToggleMemoCheck: (categoryId: string, memoId: string) => void;
}

const MemoList: React.FC<MemoListProps> = ({
  selectedCategory,
  newMemoContent,
  onNewMemoContentChange,
  onAddMemo,
  onDeleteMemo,
  onToggleMemoCheck,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onAddMemo();
    }
  };

  if (!selectedCategory) {
    return <div className="col-span-2">カテゴリを選択してください</div>;
  }

  return (
    <div className="col-span-2">
      <h1 className="text-xl font-semibold mb-4">{selectedCategory.name}</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={newMemoContent}
          onChange={(e) => onNewMemoContentChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="新しいメモ"
          className="flex-grow p-2 border rounded-l"
        />
        <button
          onClick={onAddMemo}
          className="bg-blue-500 text-white p-2 rounded-r hover:bg-green-600 flex items-center justify-center"
          style={{ width: "40px", height: "40px" }}
        >
          <Plus size={24} />
        </button>
      </div>
      <ul>
        {selectedCategory.memos.map((memo: Memo) => (
          <li
            key={memo.id}
            className="bg-gray-50 p-3 rounded mb-2 flex justify-between items-center"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={memo.isChecked}
                onChange={() => onToggleMemoCheck(selectedCategory.id, memo.id)}
                className="mr-2"
              />
              <span
                className={`${
                  memo.isChecked ? "line-through text-gray-400" : ""
                }`}
              >
                {memo.content}
              </span>
            </div>
            <button
              onClick={() => onDeleteMemo(selectedCategory.id, memo.id)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemoList;
