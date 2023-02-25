const mongoose = require("mongoose");
const userModel = require("./user");
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

async function getUsers(name, username) {
  let result;
  if (name === undefined && username === undefined) {
    result = await userModel.find();
  } else if (name && !username) {
    result = await findUserByName(name);
  } else if (username && !name) {
    result = await findUserByUsername(username);
  } else if (name && job) {
    result = await findUserByNameUsername(name, username);
  }
  return result;
}

async function findUserById(id) {
  try {
    return await userModel.findById(id);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUserOrItem(userOrItem) { //OrItem
  try {
    const userOrItemToAdd = new userModel(userOrItem);
    const savedUserOrItem = await userOrItemToAdd.save();
    return savedUserOrItem;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByName(name) {
  return await userModel.find({ name: name });
}

async function findUserByUsername(username) {
  return await userModel.find({ username: username });
};

async function findUserByNameUsername(name, username){
  name_result = await userModel.find({name : name});
  result = name_result.filter( (user) => user['username'] === username);
  return result;
};

async function deleteUserId(id){
  const result = await userModel.findByIdAndDelete(id);
  return result;
  // const user_index = await userModel.findIndex( (user) => user['id'] === id);
  // if (user_index > -1 && user_index != undefined && user_index.length !== 0){

  // }
}

exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUserOrItem = addUserOrItem;
exports.deleteUserId = deleteUserId;