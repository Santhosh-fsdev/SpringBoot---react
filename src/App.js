import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Show from './Show';
import './App.css';
import Grid from '@material-ui/core/Grid';
import AddBoxIcon from '@material-ui/icons/AddBox';

function App() {

  const [todo, setTodo] = useState('');
  const [bool,setBool] = useState(false);
  const [load,setLoad] = useState(false);
  const [todos,setTodos] = useState([]);
  const [count,setCount] = useState(0);
  
  useEffect(()=>{
    fetch('http://localhost:8080/todos')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTodos(data);
        
        setLoad(true);
        const count1 = data.length;
        setCount(count1);
        console.log(data);
      })
      .catch((error) => console.error(error));
  },[count])

  const deleteTodo = (id) =>{

    

    axios.delete('http://localhost:8080/deleteTodo/'+ id)
    .then((response)=>{
      let newTodo = todos.filter(el => el.id !== id);
      setTodos(newTodo);
      setCount((prevCount)=> prevCount - 1);
      console.log(response.data);
    })
    .catch((error)=> console.log(error));

  }

  const tickTodo = (id) =>{
    axios.put('http://localhost:8080/updateTodo/'+ id)
    .then((res)=> console.log(res.data))
    .catch((err) => console.log(err));
  }


  const submit = () => {

    const payload = {
      todo,
      bool,
    }

    axios({
      url:'http://localhost:8080/save',
      method:'post',
      data:payload
    })
    .then((response)=>{
      const todo1 = todos;
      todo1.push(payload);
      setTodos(todo1);
      setTodo('');
      setCount((prevCount)=> prevCount + 1);
      console.log(response.data);

    })
    .catch((error)=> console.error(error))
  }
  return (
    <div >
    <Grid container>
      <Grid item xs={12} sm={4} md={4} style={{backgroundColor:'#32324b',height:'98vh'}}>

      </Grid>
      <Grid item xs={12} sm={8} md={8} className="App" >
      <div>
      <h3 style={{fontSize:'2rem',color:'#ffffff'}}>Plan Your Day</h3>
      <input
        type="text"
        style={ { fontSize:'1.5rem' }}
        value={todo}
        onChange={((e) => setTodo(e.target.value))}
      />
      <AddBoxIcon
      style={ {marginBottom:'-0.5rem',cursor: 'pointer',color:'#ffffff'}}
        onClick={submit} fontSize="large" color="primary"/>
        <br />
        <h4 style={ { color: '#ffffff' }}>Count:{count}</h4>
        <div>
          {load && todos.map((todo,index) =>{
            return (
            <Show todo={todo} key={index} deleteTodo={deleteTodo} tickTodo={tickTodo} />
            )
          })}
        </div>
        </div>
      </Grid>

    </Grid>
    

    </div>
  );
}

export default App;
