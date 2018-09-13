import React from 'react';
import { getToken, claimPayment } from '../blockchainService';

export default class Sellers extends React.Component{
  constructor(){
    super();
    this.state = {
      balance : 0
    };
  }

  getToken(){
    getToken(this.props.trackingToken, this.props.activeUser,  this.props.web3)
    .then((data) =>{

      console.log('D', data);
        this.setState(()=>({
            balance : data
        }), () =>{
          console.log('!!', this.state);
        });
    })
  }

  claimPayment(){
    // TODO: need to claim payments from Wallet contract
    getToken(this.props.trackingToken, this.props.activeUser,  this.props.web3)
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
        <h1>Conservers</h1>
        <section id="blockchainInteraction">
          <div>
            <div className="account-title"><strong>Account:</strong><span>{this.props.activeUser}</span></div>
            <button onClick={ this.getToken.bind(this) }>Get Token</button>
            <button onClick={ this.claimPayment.bind(this) }>Claim Payment</button>
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