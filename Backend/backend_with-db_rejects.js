//user-services.js
async function getUsersOrItems(name, username, userOrItemType) {
    let result;
    if (name === undefined && username === undefined) {
      if (userOrItemType == "users"){
        result = await userModel.find();
      }
      else if (getUsersOrItemType == "items"){
        result = await itemModel.find();
      }
    } else if (name && !username) {
      result = await findUserOrItemByName(name);
    } else if (username && !name) {
      result = await findUserByUsername(username);
    } else if (name && username) {
      result = await findUserByNameUsername(name, username);
    }
    return result;
  }



//backend_with_db.js 
// doesn't like items because username is undefined, since not in the items schema, i think
app.get('/:users_items', async (req, res) => {
    const users_items = req.params['users_items']
    const name = req.query['name'];
    username = req.query['username'];
    // let username;

    try {
        // if (users_items == "users"){
        //     username = req.query['username'];
        // } 
        console.log("here");
        console.log(name);
        console.log(username);
        console.log(users_items);        
        const result = await userServices.getUsersOrItems(name, username, users_items);
        res.send({users_items : result});

    } catch (error) {
        console.log(error);
        res.status(500).send('An error ocurred in the server.');
    }

});