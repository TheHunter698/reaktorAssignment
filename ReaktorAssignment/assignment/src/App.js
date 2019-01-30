/*
* App will do one thing, filter the item I need and then pass it to the InfoScreen, the name will come from clicking in the navbar (lifting up state)
* and the result object will go to the InfoScreen, which will show the information
*/

import React, { Component } from 'react'
import './App.css';
import NavBar from './Components/NavBar'
import InfoScreen from './Components/InfoScreen'
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      info: [],
      infoScreen: null,
    }
  }

  componentDidMount(){
    axios(`http://localhost:5000/`, {
      method: 'GET',
    })
    .then((response) => {
     this.setState({info: response.data})
      })
    .catch(err => console.log(err))
   }

  handleOnClick =(e) => {
    var name = e.currentTarget.className
    axios(`http://localhost:5000/SP?name=${name}`)
    .then((result) => {
      this.setState({infoScreen: result.data})
    })
    .catch((err) => console.log(err))
  }

  render() {
    
    return (
      <div style={{display: 'flex'}}>
        <b>Status of Software packages</b>
         <NavBar items = {this.state.info} setItemToShow = {this.handleOnClick}/>
         <InfoScreen itemToShow = {this.state.infoScreen} setItemToShow = {this.handleOnClick}/> 
      </div>
    );
  }
}

export default App;
