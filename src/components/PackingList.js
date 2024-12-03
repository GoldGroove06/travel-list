import Item from "./Item";
import { useState } from "react";

function PackingList({items, onDeleteItem, onPacked, handleClearList}) {
    const [sortedBy, setSortedBy] = useState("packed")
    let sortedItems;
    if (sortedBy === "input") sortedItems = items ;
  
    if (sortedBy === "packed") sortedItems = items.slice().sort((a,b) => Number(a.packed) - Number(b.packed));
  
    if (sortedBy === "description") sortedItems = items.slice().sort((a,b) => a.description.localeCompare(b.description));
  
    return (
      <div className="list">
        <ul >
          {sortedItems.map((item) => (
            <Item item={item} onDeleteItem={onDeleteItem} onPacked={onPacked} key={item.id}/>
          ))}
        </ul>
        <div className="action">
          <select value={sortedBy} onChange={(e) => setSortedBy(e.target.value)}>
            <option value="input">Sort By Input Order</option>
            <option value="packed">Sort By Packed Status</option>
            <option value="description">Sort By description</option>
          </select>
          <button onClick={() => handleClearList()}>Clear List</button>
        </div>
      </div>
    );
  }

  export default PackingList