import React, { useState } from "react";
import GroceryComponent from "./components/GroceryComponent";

function App() {
  const [groceryItems, setGroceryItems] = useState([]);

  const handleAddItem = (item) => {
    const newItem = { id: crypto.randomUUID(), item, completed: false };
    setGroceryItems((prevItems) => [...prevItems, newItem]);
  };

  const handleDeleteItem = (id) => {
    setGroceryItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleUpdateItem = (id, newItemText, newCompletedStatus) => {
    setGroceryItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, item: newItemText, completed: newCompletedStatus }
          : item,
      ),
    );
  };

  const handleClearItems = () => {
    setGroceryItems([]);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500">
      <GroceryComponent
        groceryItems={groceryItems}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onUpdateItem={handleUpdateItem}
        onClearItems={handleClearItems}
      />
    </div>
  );
}

export default App;
