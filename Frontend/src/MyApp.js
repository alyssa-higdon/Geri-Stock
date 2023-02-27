import React, {useState, useEffect} from 'react';
import UserTable from './UserTable';
import ItemTable from './ItemTable';
import UserForm from './UserForm';
import ItemForm from './ItemForm';
import axios from 'axios';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

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
     return response;
  }
  catch (error) {
     console.log(error);
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
    console.log("fecthed All items");
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
        <ul>
          <li>
            <Link to="/users-table">List all USERS</Link>
          </li>
          <li>
            <Link to="/user-form">Insert a USER</Link>
          </li>
          <li>
            <Link to="/items-table">List all ITEMS</Link>
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