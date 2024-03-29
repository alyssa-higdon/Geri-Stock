const express = require("express");
const cors = require("cors");
const userServices = require("./models/user-services");
const dotenv = require("dotenv");
dotenv.config();
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://"+process.env.MONGO_USER+":"+process.env.MONGO_PWD+"@" + process.env.MONGO_CLUSTER + "/" + process.env.MONGO_DB;
console.log(uri);

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  if (err) throw err;
  const db = client.db("test");
  console.log("Connected to MongoDB!");
});


const app = express();
const port = 5001;


app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
res.send("Hello World!");
});

// -------------- GET -------------- 
app.get("/:users_or_items", async (req, res) => {
    const users_items = req.params["users_or_items"]
    const name = req.query["name"];
    username = req.query["username"];

    try {
        const result = await userServices.getUsersOrItems(name, username, users_items);
        console.log(result);
        res.send({users_or_items : result});

    } catch (error) {
        console.log(error);
        res.status(500).send("An error ocurred in the server.");
    }
});

app.get("/users/:id", async (req, res) => {
    const id = req.params["id"];
    const result = await userServices.findUserOrItemById(id, users);
    if (result === undefined || result === null)
        res.status(404).send("Resource not found.");
    else {
        res.send({users_list: result});
    }
});


app.get("/items/:id", async (req, res) => {
    const id = req.params["id"];
    const result = await userServices.findUserOrItemById(id, "items");
    if (result === undefined || result === null)
        res.status(404).send("Resource not found.");
    else
        res.send({items_list: result});
});

app.get("/users/", async (req, res) => {
    const username = req.params["username"];
    const result = await userServices.findUserByUsername(username, "users");
    if (result === undefined || result === null)
        res.status(404).send("Resource not found.");
    else {
        res.send({users_list: result});
    }
});

// -------------- POST -------------- 
app.post("/:users_or_items", async (req, res) => {
    const userOrItemType = req.params["users_or_items"]
    const userOrItemInfo = req.body;
    userOrItemInfo.id = Date.now();
    if (userOrItemType == "items"){
        userOrItemInfo.date = new Date(0);
        userOrItemInfo.date.setUTCSeconds(userOrItemInfo.id/1000);
    }

    const savedUserOrItem = await userServices.addUserOrItem(userOrItemInfo, userOrItemType);
    if (savedUserOrItem)
        res.status(201).send(savedUserOrItem);
    else
        res.status(500).end();
});


// -------------- DELETE -------------- 
app.delete("/users/:id", async (req, res) => {
    const id = req.params["id"];
    const deletedUser = await userServices.deleteUserOrItemById(id, "users");
    if (deletedUser)
        res.status(204).end();
    else
        res.status(404).end();
})

app.delete("/items/:id", async (req, res) => {

  const id = req.params["id"];
  const deletedItem = await userServices.deleteItemId(id);
  if (deletedItem)
      res.status(204).end();
  else
      res.status(404).end();
  
})

/////////////////////////////////////////////////////
function findItemById(id) {
    return items["items_list"].find( (item) => item["id"] === id);
}

function addItem(item){
    items["items_list"].push(item);
}

app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const deletedItem = await userServices.deleteUserOrItemById(id, "items");
    if (deletedItem)
        res.status(204).end();
    else
        res.status(404).end();
})

// -------------- PATCH -------------- 
app.patch("/items/:id",  async (req, res) => {
    const id = req.params["id"];
    const updatedInfo = req.body;
    const updatedItem = await userServices.editItemById(id, updatedInfo);
    if (updatedItem){
        res.status(200).send(updatedItem);
    } else
        res.status(405).end();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});