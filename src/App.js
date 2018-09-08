import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import Subheader from './Components/Subheader';
import Buyers from './Components/Buyers';
import Sellers from './Components/Sellers';
import Validators from './Components/Validators';

class App extends Component {
  constructor(){
    super();
    this.state = {
      activeUser : '0x895B758229aFF6C0f95146A676bBF579aD7636aa'
    };
  }

  componentDidMount(){
    
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Subheader />
        <Switch>
          <Route exact path='/' render={() => <Buyers activeUser={ this.state.activeUser }/>}  />
          <Route path='/buyers'  render={() => <Buyers activeUser={ this.state.activeUser }/>} />
          <Route path='/sellers'  render={() => <Sellers activeUser={ this.state.activeUser }/>} />
          <Route path='/validators'  render={() => <Validators activeUser={ this.state.activeUser }/>} />
        </Switch>
      </div>
    );
  }
}

export default App;
