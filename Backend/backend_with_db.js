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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    const name = req.query['name'];
    const username = req.query['username'];
    try {
        const result = await userServices.getUsers(name, username);
        res.send({users_list: result});         
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

app.post('/users', async (req, res) => {
    const user = req.body;
    const savedUser = await userServices.addUser(user);
    if (savedUser)
        res.status(201).send(savedUser);
    else
        res.status(500).end();
});

app.delete('/users/:id', async (req, res) => {
    const id = req.params["id"];
    const deletedUser = await userServices.deleteUserId(id);
    if (deletedUser)
        res.status(204).end();
    else
        res.status(404).end();
    
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});