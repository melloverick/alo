import "./App.css";
import React, { useState } from "react";

function Header() {
  return <h1>Alo</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleAdd(e) {
    e.preventDefault();
    if (!description) {
      return;
    }
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
    setDescription("");
    setQuantity(1);
    onAddItems(newItem);
  }
  return (
    <form className="add-form" onSubmit={handleAdd}>
      <h3>What do you need for your trip??</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
function Item({ item, onDeleteItem, onToggle }) {
  return (
    <div>
      <li>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggle(item.id)}
        />
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
          {item.quantity} {item.description}
        </span>
        <button className="button" onClick={() => onDeleteItem(item.id)}>
          🗑️
        </button>
      </li>
    </div>
  );
}
function List({ items, onDeleteItem, onToggle }) {
  return (
    <div className="list app">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            id={item.id}
            onDeleteItem={onDeleteItem}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
}
function Status() {
  return (
    <footer className="stats">
      <em>You have X items on your list and you have already packed X (X%)</em>
    </footer>
  );
}
function App() {
  const [items, setItems] = useState([]);
  function handleItems(item) {
    setItems([...items, item]);
  }
  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <>
      <Header />
      <Form onAddItems={handleItems} />
      <List items={items} onDeleteItem={handleDelete} onToggle={handleToggle} />
      <Status />
    </>
  );
}

export default App;
