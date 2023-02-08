const express = require('express');
const cors = require('cors');
const userServices = require('./models/user-services');

const app = express();
const port = 5000;


const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send(users);
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByName(name);
        let result1 = findUserByJob(result, job);

        result1 = {users_list: result1};
        res.send(result1);
    }
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    if (job != undefined){
        let result = findUserByJob(users['users_list'], job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = Date.now();
    addUser(userToAdd);
    res.status(201).send(userToAdd).end();
    
});

function addUser(user){
    users['users_list'].push(user);
}

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    if (deleteUser(id) == 0){
        res.status(204).end();
    }
    else{
        res.status(404).end();
    }
})

function deleteUser(id){
    const user_index = users['users_list'].findIndex( (user) => user['id'] === id);
    if (user_index > -1 && user_index != undefined && user_index.length !== 0){
        users['users_list'].splice(user_index, 1);
        return 0;
    }
    return -1;
        
}
    
const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (list, job) => { 
    return list.filter( (user) => user['job'] === job); 
}


app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});

