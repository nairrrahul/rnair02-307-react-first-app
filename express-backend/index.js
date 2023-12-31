// backend.js
import express from "express";

const app = express();
const port = 8000;

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
};

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// app.get('/users', (req, res) => {
//     res.send(users);
// });

app.get('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
       let ind = users['users_list'].indexOf(result);
       result = {users_list : users['users_list'].splice(ind, 1)};
       res.send(result);
       res.status(200).end();
    }
});

app.get('/users', (req, res) => {
    const name = req.query.name;
    const id = req.query.id;
    if(name !== undefined && id !== undefined) {
        let result = findUserByNameAndId(name, id);
        result = {users_list : result};
        res.send(result);
        res.status(200).end();  
    } else {
        res.send(users);
    }
});

function addUser(user){
    users['users_list'].push(user);
}

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id);
}

function findUserByNameAndId(name, id) {
    return users['users_list'].find((user) => user['id'] === id && user['name'] == name);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

