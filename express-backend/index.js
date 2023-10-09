// backend.js
import express from "express";
import cors from 'cors';

const app = express();
const port = 8000;

let users = { 
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

app.use(cors());
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
    res.send({users_list : users['users_list']});
    res.status(201).end();
});

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
       let filtered_list = filterOutById(result.id);
       users['users_list'] = filtered_list;
       result = {users_list : users['users_list']};
       res.send(result);
       res.status(204).end();
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
    user = {
        id: genRandomId(),
        name: user.name,
        job:user.job
    };
    users['users_list'].push(user);
}

function filterOutById(id) {
    return users['users_list'].filter((user) => user['id'] !== id);
}

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id);
}

function findUserByNameAndId(name, id) {
    return users['users_list'].find((user) => user['id'] === id && user['name'] == name);
}

function genRandomId() {
    let ids_list = users['users_list'].map((user) => user.id);
    let i = 0;
    let id = "";
    while(i < 4){
        if(i < 3){
            let idx = Math.floor(Math.random() * 26);
            id += String.fromCharCode(idx + 65);
        } else {
            let rng_num = Math.floor(Math.random() * 999);
            let id_fin = id + rng_num.toString().padStart(3, '0');
            while (ids_list.indexOf(id_fin) != -1) {
                rng_num = (rng_num+1) % 1000;
                id_fin = id + rng_num.toString().padStart(3, '0');
            }
            id = id_fin;
        }
        i++;
    }
    return id;
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

