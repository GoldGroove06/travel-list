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
        
        {perItems === 100 ?
        <em>You got everything! Ready to go ✈️</em> :
        <em>💼 You have {totalItems} items on your list, and you already packed {packedItems} ({perItems}%)</em>
          }
         
      </footer>
    );
  }

export default Stats;