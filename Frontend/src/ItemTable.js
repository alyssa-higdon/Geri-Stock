import React from 'react'
import ReactDOM from 'react-dom/client'
import MyApp from "./MyApp"
import SearchBar from "material-ui-search-bar";
import Filter from "./Filter"
// firstname -> value
var searchedValue = "";
async function makeTextEntry() {
  console.log("inside makeTextEntry")
  return (
  <form><br>
  Value to look for: <input type="text" id="value"/><br></br>
  <input type="submit" value="Submit" onclick="formdata()"/></br>
  </form>);
}

function updateSearchedValue(sV) {
  //searchedValue = MyApp.searchVal;
  //console.log("***"+typeof searchedValue)
  searchedValue = sV;
  window.location.reload(false);
}

// async function searchBox() {
//   return (<><nav><SearchBar
//     //value={MyApp.searched}
//     // added below line to set global var to use in other part
//     // searchedValue = (searchVal);
//     //onChange={(searchVal) => searchedValue = (searchVal)}
//     onChange={(searchVal) => updateSearchedValue(searchVal)}
//     onCancelSearch={() => MyApp.cancelSearch()}
//     // onChange={(searchVal) => requestSearch(searchVal)}
//     //onChange={(searchVal) => MyApp.requestSearch(searchVal)}
//     //onCancelSearch={() => MyApp.cancelSearch()}
//   /></nav></>)
// }

// function FilterButtons(props, category, value)
// {
//   return (
//     <tr>
//     <td>
//       <button onClick={() => searchBox}>Filter by Quantity</button>
//       &nbsp;&nbsp;&nbsp;
//       <button onClick={() => searchBox}>Filter by Tags</button>
//     </td>
//   </tr>
//   );
// }


function TableHeader() {
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
    // <>
    //   <Filter />
    // </>
  );
}

function TableBody(props) {
    let resultRows = [];
  // const rows = props.itemData.map((row, index) => {
    let rows = props.itemData.map((row, index) => {
      console.log(row.tag.toLowerCase().includes(searchedValue.toLowerCase()));
      // if row.tag is undefined
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
    );}
   }
  );
  //
  // if (searchedValue !== "") {
  //   console.log("SearchVal ")
    // for (let i=0; i < rows.length-1; i++) {
    //   console.log(rows[i]);
    //   if (rows[i].tag.search(searchedValue) !== -1) {
    //   resultRows.push(rows[i])}
    //   }
    // new below
    // let resultRows = rows.filter(function (row) {
    //   return row.tag.search(searchedValue) > -1}
    // }
    // )
  // }
  // else {
  //   resultRows = rows;
  // }
  // instead of bottom return statement put "resultRows"
  // instead of rows
  return (
      <tbody>
        {rows}
       </tbody>
   );
}

function ItemTable(props) {
  return (
    //console.log("Inside IT() return")
    <>
    <nav>Filter:<SearchBar
    //value={MyApp.searched}
    //onChange={(searchVal) => updateSearchedValue(searchVal)}
    onChange={(searchVal) => updateSearchedValue(searchVal)}
    onCancelSearch={() => MyApp.cancelSearch()}
    //onChange={(searchVal) => MyApp.requestSearch(searchVal)}
    //onCancelSearch={() => MyApp.cancelSearch()}
  /></nav>
  {/* <nav>Filter by Tag:<SearchBar
    value={MyApp.searched}
    onChange={(searchVal) => MyApp.requestSearch(searchVal)}
    onCancelSearch={() => MyApp.cancelSearch()}
  /></nav> */}
    {/* <table> <FilterButtons/> </table> */}

    <table>
      <TableHeader />
      <TableBody itemData={props.itemData} removeItem = {props.removeitem} />
    </table>
    </>
  );
}

export default ItemTable;