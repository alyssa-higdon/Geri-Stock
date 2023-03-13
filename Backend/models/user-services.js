const mongoose = require("mongoose");
const userModel = require("./user");
const itemModel = require("./item");
const dotenv = require("dotenv");

dotenv.config();
mongoose.set("debug", true);
mongoose.set('strictQuery', true);

mongoose
  .connect("mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PWD+"@cluster0.kpnxlin.mongodb.net/Geri-Stock", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

async function getUsersOrItems(name, username, userOrItemType) {
  let result;
  if (name === undefined && username === undefined) {
    if (userOrItemType == "users"){
      result = await userModel.find();
      console.log("cat");
    }
    else if (userOrItemType == "items"){
      result = await itemModel.find();
    }
  } else if (name && !username) {
    result = await findUserOrItemByName(name, userOrItemType);
  } else if (username && !name) {
    result = await findUserByUsername(username, userOrItemType);
  } else if (name && username) {
    result = await findUserByNameUsername(name, username);
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
  }
}

async function findUserOrItemByName(name, userOrItemType) {
  if (userOrItemType == "users"){
    return await userModel.find({ name: name });
  }
  else if (userOrItemType == "items"){
    return await itemModel.find({ name: name });
  }
}

async function findUserByUsername(username, userOrItemType) {
  if (userOrItemType == "users"){
    return await userModel.find({ username: username });
  }
  else if (userOrItemType == "items"){
    return await itemModel.find({ username: username });
  }
};

async function findUserByNameUsername(name, username, userOrItemType){
  if (userOrItemType == "users"){
    name_result = await userModel.find({name : name});
  }
  else if (userOrItemType == "items"){
    name_result = await itemModel.find({name : name});
  }
  result = name_result.filter( (user) => user['username'] === username);
  return result;
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
    // const savedUserOrItem = await userOrItemToAdd.save();
    // return savedUserOrItem;
    return false;
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
  }
}

// -------------- EDIT -------------- 
async function editItemById(id, updatedInfo) {  // idk if this is working
  // ex of updatedInfo = {"name": newName, "quantity": 5}
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
  // const user_index = await userModel.findIndex( (user) => user['id'] === id);
  // if (user_index > -1 && user_index != undefined && user_index.length !== 0){

  // }
}

exports.getUsersOrItems = getUsersOrItems;
exports.findUserOrItemById = findUserOrItemById;
exports.addUserOrItem = addUserOrItem;

exports.deleteUserOrItemById = deleteUserOrItemById;
exports.editItemById = editItemById;

exports.deleteUserId = deleteUserId;
exports.deleteItemId = deleteItemId;

