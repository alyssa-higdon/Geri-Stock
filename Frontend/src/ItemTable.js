import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";
import React, { useState, Fragment } from "react";

// still trying to figure out why all the rows turn into EditableRow

function TableHeader()  {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Quantity</th>
        <th>Tag</th>
        <th>Id</th>
        <th>Username</th>
      </tr>
    </thead>
  );
}

function TableBody(props) {
  const [selectedItemData, setSelectedItemData] = useState({
    name: "",
    quantity: "",
    tag: "",
    notes: "",
    username: ""
  });

  // the item (row) that has been chosen to edit
  const [editRow, setEditRow] = useState(null);

  const handleEditClick = (event, item) => {
    event.preventDefault();
    setEditRow(item.id);
    
    setSelectedItemData({
      name: item.name,
      quantity: item.quantity,
      tag: item.tag,
      notes: item.notes,
      username: item.username
    });
  }

  const rows = props.itemData.map((row, index) => {
    return (
      <Fragment key={index}>
        {editRow === row.id ? (
          <EditableRow 
            index={index} 
            newItemData={selectedItemData}
            setNewItemData={setSelectedItemData}
            edit={props.editItem}
          />
        ) : (
          <ReadOnlyRow 
            row={row} 
            index={index} 
            handleChange={handleEditClick}
            delete={props.removeItem}
          />
        )}
      </Fragment>
    );
   }
  );
  return (
      <tbody>
        {rows}
       </tbody>
   );
}
  
function ItemTable(props) {
  return (
    <form>
      <table>
        <TableHeader />
        <TableBody 
          itemData={props.itemData} 
          editItem={props.edititem} 
          removeItem={props.removeitem} 
        />
      </table>
    </form>
  );
}

export default ItemTable;