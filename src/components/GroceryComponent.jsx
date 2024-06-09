import React, { useState, useRef, useEffect } from "react";
import GroceryItems from "./GroceryItems";

const GroceryComponent = ({
  groceryItems,
  onAddItem,
  onDeleteItem,
  onUpdateItem,
  onClearItems,
}) => {
  const [item, setItem] = useState("");
  const inputRef = useRef(null);

  const handleAddItemClick = () => {
    if (item.trim()) {
      onAddItem(item);
      setItem("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddItemClick();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="flex w-full max-w-lg flex-col gap-6 text-white">
      <h1 className="text-center text-4xl font-semibold">Grocery Buddy</h1>
      <div className="flex w-full justify-between gap-3">
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Add new item..."
          className="w-full rounded-lg px-4 text-slate-900 shadow-lg outline-none focus:ring focus:ring-emerald-500"
          ref={inputRef}
        />
        <button
          className="rounded-lg bg-emerald-500 px-8 py-3 font-semibold tracking-wide shadow-lg transition hover:opacity-80"
          onClick={handleAddItemClick}
        >
          Add
        </button>
      </div>
      <ul className="flex flex-col divide-y divide-white/40 overflow-hidden rounded-xl bg-slate-800">
        {groceryItems.map((item) => (
          <GroceryItems
            key={item.id}
            item={item}
            handleDelete={onDeleteItem}
            handleUpdate={onUpdateItem}
          />
        ))}
      </ul>
      <button
        className={
          groceryItems < 1
            ? "hidden"
            : "mt-4 rounded-lg bg-red-500 px-4 py-2 font-semibold tracking-wide shadow-lg transition hover:opacity-80"
        }
        onClick={onClearItems}
      >
        Clear All
      </button>
    </div>
  );
};

export default GroceryComponent;
