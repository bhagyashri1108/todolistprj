import './list_form_template.css';
import React from 'react';

export default class display extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      list:[],
      task:'',
      task_time:new Date(),
      fav:'',    
      v:'',
      items:[],
      //newitems:[]
    }
    this.onchangehandler=this.onchangehandler.bind(this);
    //this.showselected=this.showselected.bind(this);
  };

  onchangehandler = (index, name, value) =>{
    let oldItems = [...this.state.items];
    //console.log(oldItems)
    oldItems[index][name] = value;
    console.log(oldItems[index]);
    this.setState({
      items: oldItems
    });
  }

  updateTodo = (index) =>{
    alert(JSON.stringify(this.state.items[index]));
    let id=this.state.items[index]._id;
    
    fetch(`/api/update/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({objt:this.state.items[index]})
    }).then(function(response) {
      console.log(response);
      return response.json();
    }); 
  }

  deleteTodo = (index) =>{
    alert(JSON.stringify(this.state.items[index]));
    let id=this.state.items[index]._id;
    
    fetch(`/api/delete/${id}`,{
      method:'DELETE',
    }).then(function(response) {
      console.log(response);
      return response.json();
    });
  }

  componentDidMount() {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(tasks => {
        var favar = tasks.filter((e1) => {
          return e1.fav === true
        })
        var nonfavar = tasks.filter((e2) => {
          return e2.fav === false
        })
        let items = favar.concat(nonfavar);
        this.setState({ items: items })
      });
  }


  render(){  
    return(
        <div>
             {
                this.state.items.map((item, index) => {
                  return(
                    <div key={index} className ="users" >
                    <input type="text" value={item.task} onChange={e => this.onchangehandler(index, "task", e.target.value)} contentEditable="true"/>
                    <input type="text" value={item.list} onChange={e => this.onchangehandler(index, "list", e.target.value)} contentEditable="true"/>
                    <input type="text" value={item.task_time} onChange={this.onchangehandler} contentEditable="true"/>
                    <input type="text" value={item.fav} onChange={this.onchangehandler} contentEditable="true"/>
                    <button onClick={e=> this.deleteTodo(index)}>Delete</button>
                    <button onClick={e=> this.updateTodo(index)}>Update</button>
                  </div> 
                  )
             })
             }
           </div>  
         )
    } 
 }

