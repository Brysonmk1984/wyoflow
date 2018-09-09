import React from 'react';
import { mintToken } from '../blockchainService';

export default class Validators extends React.Component{
  mintToken() {
    mintToken("0x947fd623601b39375cf07f36b9b8cad3054d9001", 1, "Colorado River", "Lake Powell", this.props.activeUser, this.props.trackingToken)
  }
  
  render(){
    return(
      <div>
        <section id="title">
          <h1>Validators</h1>
        </section>
        <section id="blockchainInteraction">
          <div>
            <div className="account-title"><strong>Account:</strong><span>{this.props.activeUser}</span></div>
            <button onClick={ this.mintToken.bind(this) }>Verify a Release</button>
      </div>
    );
  }
}