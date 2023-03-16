import React, {useState, useEffect} from 'react';
import UserTable from './UserTable';
import ItemTable from './ItemTable';
import UserForm from './UserForm';
import ItemForm from './ItemForm';
import LogInForm from './LogInForm';
import SearchBar from "material-ui-search-bar";
import logo from './Geri-Stock-logo.png';
import axios from 'axios';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
const CryptoJS = require('crypto-js');


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
  
// -------------- USER --------------

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
    return responce.data.users_or_items;
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

// -------------- ITEM --------------

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
    return responce.data.users_or_items;
  }
  catch(error){
    //We're not handling errors. Just logging into the console.
    console.log(error);
    return false;
  }
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

async function makeItemPostCall(item){
  try {
    let user_cookie = getCookie("auth_cookie");
    var decrypted_cookie = CryptoJS.AES.decrypt(user_cookie, "cat enthusiast").toString(CryptoJS.enc.Utf8);
    var username = decrypted_cookie.split('&')[1].substring(9, decrypted_cookie.split('&')[1].length);
    item.username = username;
    const response = await axios.post('http://localhost:5001/items', item);
    return response;
  }
  catch (error) {
     console.log(error);
     return false;
  }
}


function updateOneItem(index, newInfo){
  makeItemPatchCall(index, newInfo).then(result => {
    if (result && result.status === 200){
      const updated = items.filter((items, i) => {
        return i !== index
      });
      setItems(updated); 
    }
  })
}

async function makeItemPatchCall(index, newInfo) { 
  try {
    //console.log("newInfo:", newInfo);
    var _id = items[index]._id;
    const response = await axios.patch('http://localhost:5001/items/' + _id, newInfo);
    return response;
 }
 catch (error) {
    console.log(error);
    return false;
 }
}

async function loginUser(person) {
  try {
      console.log(person.username);
      const response = await axios.get('http://localhost:5001/users/?username=' + person.username);
      console.log("response: " + response)
      const responseData = response.data.users_or_items;
      const hashedPass = String(CryptoJS.SHA256(person.password + responseData.salt));
      if (hashedPass === responseData.password) {
          window.alert("Logged In. Hello, " + responseData.name);
          var plaintextCookie = "name="+responseData.name+"&username="+person.username+"&role="+responseData.role;
          document.cookie = "auth_cookie="+CryptoJS.AES.encrypt(plaintextCookie, "cat enthusiast");
      } else {
          window.alert("Incorrect password or incorrect username");
      }
      return response;
  } catch (error) {
      window.alert("Incorrect password or incorrect username Error");
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
    <header>
      <h1>
        <img src={logo} alt="Geri-Stock logo"/>
      </h1>
        <nav>
          <ul>
            <li>
              <Link to="/users-table">List all USERS</Link>
            </li>
            <li>
              <Link to="/user-form">Sign Up</Link>
            </li>
            <li> 
              <Link to="/login-form">Log In</Link>
            </li>
            <li>
              <Link to="/items-table">List all ITEMS</Link>
            </li>
            <li>
              <Link to="/item-form">Insert an ITEM</Link>
            </li>
          </ul>
        </nav>
      </header>
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
        <Route path="/login-form" element={<LogInForm handleSubmit={loginUser}/>} />

        <Route
          path="/items-table"
          element={
            <ItemTable
              itemData={items}
              edititem={updateOneItem}
              removeitem={removeOneItem}
              handlesubmit={updateItemList} 
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

// test for ci
