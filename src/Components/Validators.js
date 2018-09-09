import React from 'react';

export default class Validators extends React.Component{
  render(){
    return(
      <div>
        <h1>Validators</h1>
        {/* <section id="blockchainInteraction">
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
        </section> */}
      </div>
    );
  }
}