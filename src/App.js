import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { getUsers } from './blockchainService';

class App extends Component {
  constructor(){
    super();
    this.state = {
      activeUser : '0x895B758229aFF6C0f95146A676bBF579aD7636aa',
      users : [],

    };
  }
  
  getUsers(){
    this.setState(() =>({
      users : getUsers()
    }), () =>{
      console.log(this.state.users);
    });
  }

  componentDidMount(){
    this.getUsers();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">WYOFLOW</h1>
        </header>
        <p className="App-intro">
          A platform incentivizing water conservation and rehabilitation.
        </p>
        <section id="title">
          <h2> Hello, { this.state.activeUser }</h2>
        </section>
        <section id="blockchainInteraction">
          <div>
            <button>
                Get Users
            </button>
          </div>
          <div>
            <input type="text" placeholder="enter address" />
            <button>Get user tokens</button>
          </div>
          <div>
            <input type="text" placeholder="enter address"  />
            <button>Transfer ERC 20</button>
          </div>
          <div>
            <input type="text" placeholder="enter address" />
            <button>Transfer ERC 721</button>
          </div>
        </section>
        <section id="blockchainData">
          
        </section>
      </div>
    );
  }
}

export default App;
