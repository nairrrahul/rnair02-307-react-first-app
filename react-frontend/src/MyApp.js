// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function MyApp() {
  const [characters, setCharacters] = useState([]); 

  function removeOneCharacter (index) {
    let id = characters[index]['id'];
    deleteByIdx(id).then(result => {
      if(result && result.status == 204)
        setCharacters(characters);
    });
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  async function fetchAll(){
    try {
       const response = await axios.get('http://localhost:8000/users');
       return response.data.users_list;     
    }
    catch (error){
       //We're not handling errors. Just logging into the console.
       console.log(error); 
       return false;         
    }
  }

  async function deleteByIdx(id) {
    try {
      const response = await axios.delete(`http://localhost:8000/users/${id}`);
      return response;
    } catch (error) {
      console.log("delete error " + error);
      return false;
    }
  }

  async function makePostCall(person){
    try {
       const response = await axios.post('http://localhost:8000/users', person);
       return response;
    }
    catch (error) {
       console.log("post error " + error);
       return false;
    }
  }

  function updateList(person) { 
    makePostCall(person).then( result => {
    if (result && result.status === 201)
       setCharacters([...characters, person] );
    });
  }

  useEffect(() => {
  fetchAll().then( result => {
    if (result)
        setCharacters(result);
    });
  }, []);

  return (
    <div className="container">
      <Table characterData={characters} 
        removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp;