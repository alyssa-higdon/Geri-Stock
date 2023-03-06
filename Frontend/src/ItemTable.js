import ReadOnlyRow from "./components/ReadOnlyRow";
//import EditableRow from "./components/EditableRow";
//import React, { Fragment } from "react";

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
  const rows = props.itemData.map((row, index) => {
    
    return (
      //<EditableRow props={props} row={row} index={index}/>
      <ReadOnlyRow props={props} row={row} index={index}/>
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
    <table>
      <TableHeader />
      <TableBody itemData={props.itemData} editItem = {props.edititem} removeItem = {props.removeitem} />
    </table>
  );
}

export default ItemTable;