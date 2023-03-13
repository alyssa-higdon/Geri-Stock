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

// tested
async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

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

// tested
async function findUserOrItemByName(theName, userOrItemType) {
  if (userOrItemType == "users"){
    return await userModel.findOne({ name: theName });
  }
  else if (userOrItemType == "items"){
    return await itemModel.findOne({ name: theName });
  }
}

// tested
async function findUserByUsername(theUsername) {
  return await userModel.findOne({ username: theUsername });
};

// tested
async function findUserByNameUsername(thisName, thisUsername, userOrItemType){
  if (userOrItemType == "users"){
    return await userModel.findOne({name : thisName, username: thisUsername});
  }
  else if (userOrItemType == "items"){
    return await itemModel.findOne({name : thisName, username: thisUsername});
  }
};

async function deleteUserId(id){
  const result = await userModel.findByIdAndDelete(id);
  return result;
  // const user_index = await userModel.findIndex( (user) => user['id'] === id);
  // if (user_index > -1 && user_index != undefined && user_index.length !== 0){

  // }
}

async function deleteItemId(id){
  const result = await itemModel.findByIdAndDelete(id);
  return result;
  // const user_index = await userModel.findIndex( (user) => user['id'] === id);
  // if (user_index > -1 && user_index != undefined && user_index.length !== 0){

  // }
}

exports.getUsersOrItems = getUsersOrItems;
exports.findUserById = findUserById;
exports.addUserOrItem = addUserOrItem;
exports.findUserOrItemByName = findUserOrItemByName;
exports.findUserByUsername = findUserByUsername;
exports.findUserByNameUsername = findUserByNameUsername;
exports.deleteUserId = deleteUserId;
exports.deleteItemId = deleteItemId;
