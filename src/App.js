import "./App.css";
import {useState} from "react"




function App() {
  const [items, setItems] = useState([])

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
      <Stats items={items}/>
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

function Stats({items}) {
  if (!items.length){
    return <footer className="stats">
      <em>Start adding some items to your packing list 🚀</em>
    </footer>
  }
  const totalItems = items.length
  const packedItems = items.filter((item) => item.packed).length
  const perItems = Math.round(( packedItems/totalItems ) *100)
  return (
    <footer className="stats">
      <em>💼 You have {totalItems} items on your list, and you already packed {packedItems} ({perItems}%)</em>
    </footer>
  );
}
