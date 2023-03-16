import React, { useState, Fragment } from "react";
import ReactDOM from 'react-dom/client'
import MyApp from "./MyApp"
import SearchBar from "material-ui-search-bar";
import { render } from '@testing-library/react';
import { Table } from '@material-ui/core';

import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

//import MaterialTable from 'material-table';
// firstname -> value
var searchedValue = "";
var props2;

function updateSearchedValue(sV) {
  //searchedValue = MyApp.searchVal;
  //console.log("***"+typeof searchedValue)
  searchedValue = sV;
  console.log("onChange called this function");
  let s = "---------------------------------------------------------------------------------FILTERED ITEMS---------------------------------------------------------------------------"
  render(s);
  render(TableHeader());
  render(TableBody(props2));
  console.log("should have rendered filtered")
  return 1;
}

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
  props2 = props;
    let rows = props.itemData.map((row, index) => {
      console.log(row.tag.toLowerCase().includes(searchedValue.toLowerCase()));
    if (row.tag.includes(searchedValue)) {
    return (
      <tr key={index}>
      <td>{row.name}</td>
      <td>{row.quantity}</td>
      <td>{row.tag}</td>
      <td>{row._id}</td>
      <td>{row.username}</td>
      <td>
        <button onClick={() => props.removeItem(index)}>Delete</button>
      </td>
    </tr>
    );}});
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

  rows = props.itemData.map((row, index) => {
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

function cancelSearch(p) {
  window.location.reload(false);
};

function ItemTable(props) {
  return (
    <>
    <nav>Filter:<SearchBar
    //onChange={(searchVal) => updateSearchedValue(searchVal)}
    onKeyDown={(e) => (e.keyCode === 13 ? updateSearchedValue(MyApp.searchVal) : null)}
    onCancelSearch={() => cancelSearch(props)}
  /></nav>
  <form>
    <table>
      <TableHeader />
      <TableBody
      itemData={props.itemData}
      editItem={props.edititem}
      removeItem = {props.removeitem} />
    </table>
    </form>
    </>
    

    // Jackies stuff we might need this later
    //  <form>
    //   <table>
    //     <TableHeader />
    //     <TableBody 
    //       itemData={props.itemData} 
    //       editItem={props.edititem} 
    //       removeItem={props.removeitem} 
    //     />
    //   </table>
    // </form>
    
  );
}

export default ItemTable;