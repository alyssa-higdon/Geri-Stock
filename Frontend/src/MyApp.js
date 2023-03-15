import React, {useState, useEffect} from 'react';
import UserTable from './UserTable';
import ItemTable from './ItemTable';
import UserForm from './UserForm';
import ItemForm from './ItemForm';
import LogInForm from './LogInForm';
import SearchBar from "material-ui-search-bar";
import axios from 'axios';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
const CryptoJS = require('crypto-js');



//////
function MyApp(){
  const [characters, setCharacters] = useState([]);
  
  useEffect(() => {
    fetchAllUsers().then( result => {
       if (result)
          setCharacters(result);
     });
  }, [] );

  const [items, setItems] = useState([]);
  
  useEffect(() => {
    console.log("use effect");
    fetchAllItems().then( result => {
      console.log(result);
       if (result)
          setItems(result);
     });
  }, [] );

 
function removeOneCharacter (index){
  makeUserDeleteCall(index).then(result => {
    if (result && result.status === 204){
      const updated = characters.filter((character, i) => {
        return i !== index
      });
      setCharacters(updated);
    }
  })
  
}

async function makeUserDeleteCall(index){
  try {
     var _id = characters[index]._id;
     const response = await axios.delete('http://localhost:5001/users/' + _id);
      return response;
    }
  catch (error) {
     console.log(error);
     return false;
  }
}

function updateUserList(person) { 
  makeUserPostCall(person).then(result => {
  if (result && result.status === 201)
     person = result.data;
     setCharacters([...characters, person]);
  });
}

async function fetchAllUsers(){
  try{
    const responce = await axios.get('http://localhost:5001/users');
    return responce.data.users_items;
  }
  catch(error){
    //We're not handling errors. Just logging into the console.
    console.log(error);
    return false;
  }
}

async function makeUserPostCall(person){
  try {
     const response = await axios.post('http://localhost:5001/users', person);
     window.alert("Successfully created an account");
     if(window.loggedIn) {
      console.log("Already logged in");
     }
     return response;
  }
  catch (error) {
     console.log(error);
     window.alert("Username already in use");
     return false;
  }
}

// item stuff

function removeOneItem (index){
  makeItemDeleteCall(index).then(result => {
    if (result && result.status === 204){
      const updated = items.filter((items, i) => {
        return i !== index
      });
      setItems(updated); 
    }
  })
  
}

async function makeItemDeleteCall(index){
  try {
     var _id = items[index]._id;
     const response = await axios.delete('http://localhost:5001/items/' + _id);
      return response;
    }
  catch (error) {
     console.log(error);
     return false;
  }
}

function updateItemList(item) { 
  makeItemPostCall(item).then(result => {
  if (result && result.status === 201)
     item = result.data;
     setItems([...items, item]);
  });
}

async function fetchAllItems(){
  try{
    console.log("fetched All items");
    const responce = await axios.get('http://localhost:5001/items');
    console.log(responce);
    return responce.data.users_items;
  }
  catch(error){
    //We're not handling errors. Just logging into the console.
    console.log(error);
    return false;
  }
}

async function makeItemPostCall(item){
  try {
     const response = await axios.post('http://localhost:5001/items', item);
     return response;
  }
  catch (error) {
     console.log(error);
     return false;
  }
}

async function loginUser(person) {
  try {
      const response = await axios.get('http://localhost:5001/users/?username=' + person.username);
      const responseData = response.data.users_items[0];
      const hashedPass = String(CryptoJS.SHA256(person.password + responseData.salt));
      /*
      console.log("ID: " + String(responseData._id));
      console.log("Password: " + String(person.password));
      console.log("Salt: " + String(responseData.salt));
      console.log("Stored password: " + responseData.password);      
      */

      if (hashedPass === responseData.password) {
          window.alert("Logged In. Hello, " + responseData.name);
          window.loggedIn = true;
          window.loggedInUsername = person.username;
          window.loggedInName = responseData.name;
          window.loggedInRole = responseData.role;
          console.log(window.loggedIn);
      } else {
          window.alert("Incorrect password or incorrect username");
      }
      return response;
  } catch (error) {
      window.alert("Incorrect password or incorrect username");
      console.log(error);
      return false;
  }
}




async function fetchItemsFilter(category, value) {
  var filtered_items = []
  try {
    console.log("filtered items");
    const responce = await axios.get('http://localhost:5001/items')
    console.log(responce);
    //return responce.data.users_items;
    // for (let i=0; i<(responce.data.users_items).length; i++) {
    //   if (responce.data.users_items[i].cat === value) {
    //     filtered_items.push(responce.data.users_items[i]);
    //   }
    // }
    switch (category) {
      // search tags list to see if value is in the list
      case "tags":
        filtered_items = responce.data.users_items.filter(item => item.tags.includes(value));
        break;
      case "date":
        filtered_items = filtered_items = responce.data.users_items.filter(item => item.date === value);
        break;
      case "quantity":
        filtered_items = responce.data.users_items.filter(item => item.quantity === value);
        break;
      default:
        break;
    }
    return filtered_items
  }
  catch(error) {
    console.log(error);
    return false;
  }
}
// new functions for search bar below
// originalRows = list of items
  const originalRows = fetchAllItems();
  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
    const filteredRows = originalRows.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };
// new functions for search bar above


return (
  // This is what we had before:
  // <div className="container">
  //   <Table characterData={characters} removeCharacter={removeOneCharacter} />
  //   <Form handleSubmit={updateList} />
  // </div>
  // update basename below when deploying to gh-pages
  <div className="container">
    <h1>Choose your path!</h1>
    <BrowserRouter basename="/">
      <nav>
        
        {/* <SearchBar
          value={searched}
          onChange={(searchVal) => requestSearch(searchVal)}
          onCancelSearch={() => cancelSearch()}
        /> */}
        
        <ul>
          <li>
            <Link to="/users-table">List all USERS</Link>
          </li>
          <li>
            <Link to="/user-form">Insert a USER</Link>
          </li>
          <li>
            <Link to="/items-table">List all ITEMS</Link>
            {/* below */}
            {/* <li> <Link to="/items-table/filter">Filter Items</Link></li> */}
            {/* above */}

          </li>
          <li>
            <Link to="/item-form">Insert an ITEM</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="/users-table"
          element={
            <UserTable
              characterData={characters}
              removeCharacter={removeOneCharacter}
            />
          }
        />
        <Route path="/user-form" element={<UserForm handleSubmit={updateUserList} />} />

        <Route
          path="/items-table"
          element={
            <ItemTable
              itemData={items}
              removeitem={removeOneItem}
            />
          }
        />
        <Route path="/item-form" element={<ItemForm handleSubmit={updateItemList} />} />        
      </Routes>
    </BrowserRouter>
  </div>
);
}
export default MyApp;