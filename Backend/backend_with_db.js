const express = require('express');
const cors = require('cors');

const userServices = require('./models/user-services');

const dotenv = require("dotenv");
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
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
//////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/:users_items', async (req, res) => {
    const users_items = req.params['users_items']
    const name = req.query['name'];
    username = req.query['username'];

    try {
        const result = await userServices.getUsersOrItems(name, username, users_items);
        console.log(result);
        res.send({users_items : result});

    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }

});

app.get('/users/:id', async (req, res) => {
    const id = req.params['id'];
    const result = await userServices.findUserById(id);
    if (result === undefined || result === null)
        res.status(404).send('Resource not found.');
    else {
        res.send({users_list: result});
    }
});

//add item stuff idk
// app.get('/items', async (req, res) => {
//     const name = req.query['name'];
//     if (name != undefined){
//         let result = findItemByName(name);

//         result = {items_list: result};
//         res.send(result);
//     }
//     else{
//         res.send(items);
//     }
// });

app.get('/items/:id', async (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findItemById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {items_list: result};
        res.send(result);
    }
});


////////////////////////////////////////////////////
app.post('/:users_items', async (req, res) => {
    const userOrItemType = req.params['users_items']
    const userOrItemInfo = req.body;
    userOrItemInfo.id = Date.now();
    if (userOrItemType == "items"){
        //userOrItemInfo.id = Date.now();
        userOrItemInfo.date = new Date(0);
        userOrItemInfo.date.setUTCSeconds(userOrItemInfo.id/1000);
    }
    //userOrItemInfo.date = temp;

    const savedUserOrItem = await userServices.addUserOrItem(userOrItemInfo, userOrItemType);
    if (savedUserOrItem)
        res.status(201).send(savedUserOrItem);
    else
        res.status(500).end();
});



////////////////////////////////////////////////////
app.delete('/users/:id', async (req, res) => {
    const id = req.params["id"];
    const deletedUser = await userServices.deleteUserId(id);
    if (deletedUser)
        res.status(204).end();
    else
        res.status(404).end();
    
})

/////////////////////////////////////////////////////
function findItemById(id) {
    return items['items_list'].find( (item) => item['id'] === id);
}

function addItem(item){
    items['items_list'].push(item);
}

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    if (deleteItem(id) == 0){
        res.status(204).end();
    }
    else{
        res.status(404).end();
    }
})

function deleteItem(id){
    const item_index = items['items_list'].findIndex( (item) => item['id'] === id);
    if (item_index > -1 && item_index != undefined && item_index.length !== 0){
        items['items_list'].splice(item_index, 1);
        return 0;
    }
    return -1;    
}

const findItemByName = (name) => { 
    return items['items_list'].filter( (item) => item['name'] === name); 
}

// edit item stuff

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});