import React, { useState, useEffect } from 'react';
import Show from './Show';
import './App.css';
import Grid from '@material-ui/core/Grid';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import cookie from 'react-cookies'

import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color:"#ffffff"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      color:'#ffffff'
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    input:{
        color: '#ffffff',
        fontSize: '1rem',
        borderColor:'#ffffff'
    }
  }));

function App() {

  const [todo, setTodo] = useState('');
  const [bool,setBool] = useState(false);
  const [bool1,setBool1] = useState(false);
  const [load,setLoad] = useState(false);
  const [todos,setTodos] = useState([]);
  const [count,setCount] = useState(0);
  const [name,setName] = useState('');
  let [token,setToken] = useState('');
  const [pass,setPass] = useState('');
  const classes = useStyles();
  
  useEffect(()=>{
    if(bool1 === false){
      try{
        token = cookie.load('auth_token')
      }
      catch (error) { console.log(error.message)}
    }
    if(token === undefined ){
      console.log("Not authenticated")
    }
    else{
      setBool1(true);
      axios.get('http://localhost:8080/todos', { headers: {"Authorization" : `Bearer ${token}`} })
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
        
        setLoad(true);
        const count1 = response.data.length;
        setCount(count1);
      })
      // .then((data) => {
        
      //   console.log(data);
      // })
      .catch((error) => console.error(error));
    }
    
  },[count,bool1])

  const submit1 = (e) =>{
    e.preventDefault();
    
    const payload = {
      username: name,
      password:pass
    }

    axios({
      url:'http://localhost:8080/authenticate',
      method: 'POST',
      data: payload
    })
    .then((res) => {cookie.save('auth_token',res.data.jwt); setBool1(true);setName('');setPass('')})

    .catch(error => console.log(error.message));
  }
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
      { bool1 ? <Button style={{margin:'5rem',background:'red',color:'#ffffff'}} color="secondary" onClick={()=>{cookie.remove('auth_token'); setBool1(false)}}>Logout</Button>: <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              color="primary"
              autoFocus
              required
              fullWidth
              id="mail"
              value={name}
              onChange = {(e)=> setName(e.target.value)}
              label="username"
              name="username"
              InputProps={{
    className: classes.input
  }}
              autoComplete="username"
              
            />
            <TextField
              variant="outlined"
              margin="normal"
              color="primary"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={pass}
              onChange = {(e)=> setPass(e.target.value)}
              InputProps={{
    className: classes.input
  }}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick= {submit1}
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        
      </Container>}
      
      </Grid>
      <Grid item xs={12} sm={8} md={8} className="App" >
      {bool1 ? <div>
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
        </div>: <h4 style={ { color:'#ffffff',margin:'10rem',fontSize:'3rem'}}> You are not authenticated</h4>}
      
      </Grid>

    </Grid>
    

    </div>
  );
}

export default App;
