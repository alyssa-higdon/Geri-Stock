const mongoose = require("mongoose");
const userModel = require("./user");
const itemModel = require("./item");
const dotenv = require("dotenv");

dotenv.config();
mongoose.set("debug", true);
mongoose.set('strictQuery', true);

mongoose.connect("mongodb+srv://"+"akhigdon"+":"+"RHRnZ2fqmbz75eJ4"+"@cluster0.kpnxlin.mongodb.net/Geri-Stock", {
    useNewUrlParser: true,
    useUnifiedTopology: true,})//.catch((error) => console.log(error));

async function getUsersOrItems(name, username, userOrItemType) {
  let result;
  if (name === undefined && username === undefined) {
    if (userOrItemType == "users"){
      result = await userModel.find();
    }
    else if (userOrItemType == "items"){
      result = await itemModel.find();
    } else {
      result = undefined;
    }
  } else if (name && !username) {
    result = await findUserOrItemByName(name, userOrItemType);
  } else if (username && !name) {
    result = await findUserByUsername(username, userOrItemType);
  } else {
    result = await findUserByNameUsername(name, username, userOrItemType);
  }
  return result;
}

// -------------- FIND -------------- 
// combine find functions eventually
async function findUserOrItemById(id, userOrItemType) {
  if (userOrItemType == "users"){
    try {
      return await userModel.findById(id);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  else if (userOrItemType == "items"){
    try {
      return await itemModel.findById(id);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  } else {
    return undefined;
  }
}

async function findUserOrItemByName(theName, userOrItemType) {
  if (userOrItemType == "users"){
    return await userModel.findOne({ name: theName });
  }
  else if (userOrItemType == "items"){
    return await itemModel.findOne({ name: theName });
  } else {
    return undefined;
  }
}

async function findUserByUsername(theUsername, userOrItemType) {
  if (userOrItemType == "users"){
    return await userModel.findOne({ username: theUsername });
  } else {
    return undefined;
  }
};

async function findUserByNameUsername(theName, theUsername, userOrItemType){
  if (userOrItemType == "users"){
    return await userModel.findOne({name : theName, username: theUsername});
  }
  else if (userOrItemType == "items"){
    return await itemModel.findOne({name : theName});
  } else {
    return undefined;
  }
};

// -------------- ADD -------------- 
async function addUserOrItem(userOrItem, userOrItemType) {
  console.log(userOrItemType)
  try {
    if (userOrItemType == "users"){
      const userOrItemToAdd = new userModel(userOrItem);
      const savedUserOrItem = await userOrItemToAdd.save();
      return savedUserOrItem;
    }
    else if (userOrItemType == "items"){
      const userOrItemToAdd = new itemModel(userOrItem);
      const savedUserOrItem = await userOrItemToAdd.save();
      return savedUserOrItem;
    }
    else{
      console.log("Error: wrong users or items type");
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

// -------------- DELETE -------------- 
async function deleteUserOrItemById(id, userOrItemType){
  if (userOrItemType == "users"){
    return await userModel.findByIdAndDelete(id);
  }
  else if (userOrItemType == "items"){
    return await itemModel.findByIdAndDelete(id);
  } else {
    return undefined;
  }
}


// -------------- EDIT -------------- 
async function editItemById(id, updatedInfo) {
  try {
    let newDate = new Date(0);
    return await itemModel.findByIdAndUpdate(
                            id,
                            {$set: updatedInfo, date: newDate.setUTCSeconds(Date.now()/1000)},
                            {new: true});
  } catch (error) {
    console.log(error);
    return false;
  }
}


async function deleteItemId(id){
  const result = await itemModel.findByIdAndDelete(id);
  return result;
}

exports.editItemById = editItemById;
exports.getUsersOrItems = getUsersOrItems;
exports.findUserOrItemById = findUserOrItemById;
exports.addUserOrItem = addUserOrItem;
exports.findUserOrItemByName = findUserOrItemByName;
exports.findUserByUsername = findUserByUsername;
exports.findUserByNameUsername = findUserByNameUsername;
exports.deleteUserOrItemById = deleteUserOrItemById;
exports.deleteItemId = deleteItemId;