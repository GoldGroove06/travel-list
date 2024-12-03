import "./App.css";
import {useState} from "react"
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";


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

  function handleClearList(){
    const confirm = window.confirm(
      "Are you sure you want to clear all items?"
    )
    if (confirm) setItems([])
    
  }

  return (
    <div>
      <Logo />
      <Form onAddItem={onAddItem}/>
      <PackingList items={items} onDeleteItem={onDeleteItem} onPacked={onPacked} handleClearList={handleClearList}/>
      <Stats items={items}/>
    </div>
  );
}

export default App;









