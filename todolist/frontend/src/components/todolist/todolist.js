import './list_form_template.css';
import React from 'react';

export default class todolist extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      listname:'',
      taskname:'',
      time:'',
      favorite:false,    
      items:[] 
    }
  };

  onchangehandler = (e) =>{
    this.setState({[e.target.name]:e.target.value});
  }

  componentDidMount(){
    fetch('/api/tasks')
    .then(res => res.json())
    .then(tasks => this.setState({items:tasks}, () => console.log('tasks fetched...',tasks)));
  }

  handlesubmit = (event) => {

    event.preventDefault();
    console.log('fetched data',this.state);

    fetch('/api/take', {
        method: 'POST',
        headers:{
          'Content-type':'application/json' 
        },
        // We convert the React state to JSON and send it as the POST body
        body: JSON.stringify({it:this.state})
      }).then(function(response) {
        console.log(response)
        return response.json();
      });
}
  render(){
    return(
            <div>
            <form className="Form" onSubmit={this.handlesubmit}>
              <input type="text" name="listname" placeholder="name of todo list" value={this.state.listname} onChange={this.onchangehandler}/><br></br>
              <input type="text" name="taskname"placeholder="add task" value={this.state.taskname} onChange={this.onchangehandler}/><br></br>
              <input type="text" name="time"placeholder="time" value={this.state.time} onChange={this.onchangehandler}/><br></br>
              <input type="text"  name="favorite"placeholder="favorite" value={this.state.favorite} onChange={this.onchangehandler}/><br></br> 
              <button>Submit</button>
            </form>
           </div>
       )
    } 
 }

