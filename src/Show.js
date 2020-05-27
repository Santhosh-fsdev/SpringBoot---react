import React from 'react';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import "./Show.css";
const style = {
    div:{
        height: '3rem',
        display: 'inline-block',
        width:'20rem'
    },
    p:{
      margin:'1rem',
      fontFamily: 'sans-serif',
      color:"000000"
    },
    button:{
        outline: 'none',
        color:'444462',
        cursor: 'pointer',
        paddingRight: '0.7rem'

    }
}

export default function Show(props){


    return(
        <Grid container
            spacing={3} style={{width:'24rem'}}>
              <Grid item xs={12} sm={4} md={4}>
              <Paper className={props.todo.bool? "completed": null} style={style.div}>
              <p style={style.p}>{props.todo.todo}</p>

              </Paper>
              </Grid>
              <Grid item xs={12} sm={4} md={4} style={{width:'2rem',marginLeft:'8rem',marginTop:'1rem'}}>
              <DeleteIcon style={style.button} onClick={()=>{props.deleteTodo(props.todo.id)}} size="small" />
              <DoneAllIcon style={style.button} onClick={()=>{props.tickTodo(props.todo.id)}} size="small" />
              </Grid>
            </Grid>

      
    )
  };


  