import React from 'react';
import { getBalance, buyCredits } from '../blockchainService';

export default class Buyers extends React.Component{
  constructor(){
    super();
    this.state = {
      balance : 0
    };
  }

  buyCredits(){
    buyCredits(this.props.activeUser)
    .then((data) =>{
      console.log('Credits DATA', data);
    })
  }

  getBalance(){
    getBalance(this.props.activeUser)
    .then((data) =>{
        this.setState(()=>({
            balance : data
        }), () =>{
          console.log('!!', this.state);
        });
   
    })
  }


  render(){
    return(
      <div>
        <section id="title">
          <h2> Hello, {this.props.activeUser}</h2>
        </section>
        <section id="blockchainInteraction">
          <div>
            <button onClick={ this.buyCredits.bind(this) }>
                Buy Credits
            </button>
          </div>
          <div>
            <button onClick={ this.getBalance.bind(this) }>
                Get Balance
            </button>
          </div>
        </section>
        <section id="blockchainData" class={ this.state.balance ? 'show' : 'hide' }>
          <div>
            Water Offset Token Balance : { this.state.balance }
          </div>
        </section>
      </div>
    );
  }
}