import React, { useState, Fragment } from "react";
import MyApp from "./MyApp"
import SearchBar from "material-ui-search-bar";
import { render } from '@testing-library/react';
import { Table } from '@material-ui/core';

import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

var searchedValue = "";
var props2;
<<<<<<< HEAD


function updateSearchedValue(sV) {
=======
var whichRows = 0;

function updateSearchedValue(sV) {
  //searchedValue = MyApp.searchVal;
  console.log("***"+typeof searchedValue)
>>>>>>> fa78e1f9c9f1749614b70331c5d3f860333fcfa2
  searchedValue = sV;
  whichRows = 1;
  console.log("onChange called this function");
  let s = "---------------------------------------------------------------------------------FILTERED ITEMS---------------------------------------------------------------------------"
  render(s);
  render(TableHeader());
  render(TableBody(props2));
  console.log("should have rendered filtered")
  return 1;
}

<<<<<<< HEAD
=======
// still trying to figure out why all the rows turn into EditableRow

>>>>>>> fa78e1f9c9f1749614b70331c5d3f860333fcfa2
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
  console.log("this is searchedValue: " + searchedValue)
    let rws = props.itemData.map((rw, index) => {
      //console.log(rw.tag.toLowerCase().includes(searchedValue.toLowerCase()));
      console.log(rw.tag);
    if (rw.tag.includes(searchedValue)) {
    return (
      <tr key={index}>
      <td>{rw.name}</td>
      <td>{rw.quantity}</td>
      <td>{rw.tag}</td>
      <td>{rw._id}</td>
      <td>{rw.username}</td>
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

  let rows = props.itemData.map((row, index) => {
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

<<<<<<< HEAD
  return (
      <tbody>
        {rows}
       </tbody>
   );
}

function cancelSearch(p) {
=======
  if (whichRows === 0){
    return (
        <tbody>
          {rows}
        </tbody>
    );
  }
  else {
    return (
        <tbody>
          {rws}
        </tbody>
  );
  }

}

function cancelSearch() {
  whichRows = 0;
>>>>>>> fa78e1f9c9f1749614b70331c5d3f860333fcfa2
  window.location.reload(false);
};

function ItemTable(props) {
  return (
    <>
    <nav>Filter:<SearchBar
    onKeyDown={(e) => (e.keyCode === 13 ? updateSearchedValue(MyApp.searchVal) : null)}
    onCancelSearch={() => cancelSearch()}
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
    

    // Jackie's stuff we might need this later
    //  <form>
    //   <table>
    //     <TableHeader />
    //     <TableBody 
    //       itemData={props.itemData} 
    //       editItem=g{props.edititem} 
    //       removeItem={props.removeitem} 
    //     />
    //   </table>
    // </form>
    
  );
}

export default ItemTable;