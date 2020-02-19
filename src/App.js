import React from 'react';
import './App.css';
import './globalcss.scss'
import Signup from './signup';

class App extends React.Component{
  
  render(){
    return(
      <div className="App">
      <Signup />
      </div>
    )
  }
}

export default App;
