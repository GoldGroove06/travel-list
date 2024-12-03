import "./App.css";
import {useState} from "react"


const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "H", quantity: 5, packed: false },
];

function App() {
  const [items, setItems] = useState(initialItems)

  function onAddItem(newItem) {
    setItems((items) => [...items, newItem])
  }

  function onDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id))
  }

  function onPacked(id){
    setItems(items => items.map(item => item.id === id ?
      {...item, packed: !item.packed} : item
    ))
  }

  return (
    <div>
      <Logo />
      <Form onAddItem={onAddItem}/>
      <PackingList items={items} onDeleteItem={onDeleteItem} onPacked={onPacked}/>
      <Stats />
    </div>
  );
}

export default App;

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({onAddItem}) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e){
    e.preventDefault();
    if (!description) return;

    const newItem = {id: Date.now(), description, quantity, packed:false }
    console.log(newItem)
    onAddItem(newItem)
    
  } 
  return (
    <form className="add-form" onSubmit= {handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
        {Array.from({ length: 20}, (_,i) => i+1).map(
          (num) => (
              <option value={num} key={num}>
                {num}
              </option>
        ))}
      </select>
      <input type="text" placeholder="Item..." value={description} onChange={(e) => setDescription(e.target.value)}></input>
      <input type="submit" value="Add"></input>
    </form>
  );
}

function PackingList({items, onDeleteItem, onPacked}) {
  return (
    <div className="list">
      <ul >
        {items.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} onPacked={onPacked} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onPacked }) {
  return (
    <li key = {item.id}>
    <input type="checkbox" value={item.packed} onChange={() => onPacked(item.id)}/>
    <span style={item.packed ? {textDecoration: 'line-through'} : {}}>{item.quantity} {item.description} </span>
    <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
    )
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
