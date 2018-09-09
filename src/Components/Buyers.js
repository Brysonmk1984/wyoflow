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
    buyCredits(this.props.offsetCrowdsale, this.props.activeUser)
    .then((data) =>{
      console.log('Credits DATA', data);
    })
  }

  getBalance(){
    getBalance(this.props.offsetToken, this.props.activeUser,  this.props.web3)
    .then((data) =>{

      console.log('D', data);
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
        <section id="blockchainInteraction">
          <div>
            <div className="account-title"><strong>Account:</strong><span>{this.props.activeUser}</span></div>
            <button onClick={ this.buyCredits.bind(this) }>Buy Credits</button>
            <button onClick={ this.getBalance.bind(this) }>Get Balance</button>
          </div>
        </section>
        <section className={ this.state.balance ? 'show blockchain-data' : 'hide blockchain-data' }>
          <div>
            Water Offset Token Balance : <strong>{ this.state.balance }</strong>
          </div>
        </section>
      </div>
    );
  }
}