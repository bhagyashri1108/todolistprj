import './list_form_template.css';
import React from 'react';


export default class display extends React.Component {

  constructor(props) {
    super(props)
  
    this.state = {
      list:'',
      task:'',
      task_time:'',
      fav:'',    
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

  render(){
    
    let {items}=this.state

    var favar=items.filter( (e1) =>{
      return e1.fav===true
    }) 
    console.log('favar is',favar)
    
    var nonfavar=items.filter( (e2) =>{
        return e2.fav===false
    })
    console.log('nonfavar is',nonfavar)
    items=favar.concat(nonfavar);
    console.log('final output',items);   

    return(
          <div>
             {items.map(item => {
                  return(
                    <div className ="users">
                     <p>{item.list}</p>
                     <p>{item.task}</p>
                     <p>{item.task_time}</p>
                     <p>{item.fav}</p>
                   </div>
                )
             })}
             </div> 
       )
    } 
 }

