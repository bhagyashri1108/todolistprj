import './mainpagelayout.css'
import React from 'react'
import Todolist from './components/todolist/todolist'
import Display from './components/todolist/display'
//import {BrowserRouter as Router,Route,Link}  from "react-router-dom";

export default class mainpage extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
       togle:'null'
    };
  };
  
  render() {
    return (
      <div>
        <h1>Welcome to ToDolist !</h1>
        {/*
        <Router>
          <Link to ="/Todolist">create list</Link><br></br>
          <Link to="/Display">Display lists</Link>

          <Route path="/Todolist" component={Todolist} />
          <Route path="/Display" component={Display} />
        </Router> */}

       <button onClick={() => { this.setState({ togle: 'create'}) }}>create list</button> 
       <button onClick={() =>{ this.setState({togle:'display'}) }}>display list</button> 
        {
          //console.log(this.state.togle)
           this.state.togle==='create'?
            //console.log('condition checked')
            //console.log(this.state.togle)
            <Todolist />
            :this.state.togle==='display'?
             <Display />
            :null
        } 
      </div>
    );
  }
}

