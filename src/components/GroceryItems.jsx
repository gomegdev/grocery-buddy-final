import React, { useState, useRef, useEffect } from "react";

const GroceryItems = ({ item, handleDelete, handleUpdate }) => {
  const [isCompleted, setIsCompleted] = useState(item.completed);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.item);
  const inputRef = useRef(null);

  const handleIsCompleted = () => {
    const newCompletedStatus = !isCompleted;
    setIsCompleted(newCompletedStatus);
    handleUpdate(item.id, editedText, newCompletedStatus);
  };

  const handleEditing = () => {
    if (isEditing) {
      handleUpdate(item.id, editedText, isCompleted);
    }
    setIsEditing(!isEditing);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li
      className={`flex items-center justify-between px-6 py-4 ${
        isCompleted ? "bg-slate-600" : "hover:bg-slate-600"
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          className={
            isEditing ? "hidden" : "size-4 rounded-lg accent-emerald-500"
          }
          checked={isCompleted}
          onChange={handleIsCompleted}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={handleTextChange}
            className="bg-slate-800 text-lg capitalize"
            ref={inputRef}
          />
        ) : (
          <span
            className={`text-lg capitalize ${
              isCompleted ? "text-white/50 line-through" : ""
            }`}
          >
            {item.item}
          </span>
        )}
      </div>
      <div className="flex gap-3">
        {!isCompleted && (
          <button
            className="rounded-lg bg-yellow-500 px-6 py-2 font-semibold tracking-wide outline-none transition hover:opacity-80"
            onClick={handleEditing}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
        )}
        <button
          className="rounded-lg bg-red-500 px-6 py-2 font-semibold tracking-wide outline-none transition hover:opacity-80"
          onClick={() => handleDelete(item.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default GroceryItems;
