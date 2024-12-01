import "./App.css";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "H", quantity: 5, packed: true },
];

function App() {
  return (
    <div>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

export default App;

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form() {
  function handleSubmit(e){
    e.preventDefault();
  } 
  return (
    <div className="add-form" onSubmit= {handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select>
        {Array.from({ length: 20}, (_,i) => i+1).map(
          (num) => (
              <option value={num} key={num}>
                {num}
              </option>
        ))}
      </select>
      <input type="text" placeholder="Item..."></input>
      <input type="submit" value="Add"></input>
    </div>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul >
        {initialItems.map((item) => (
          <Item item={item} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return <li key = {item.id}>
    <span style={item.packed ? {textDecoration: 'line-through'} : {}}>{item.quantity} {item.description} </span>
    <button>❌</button>
    </li>;
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
