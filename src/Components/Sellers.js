import React from 'react';
import { getToken, mintToken } from '../blockchainService';

export default class Sellers extends React.Component{
  render(){
    return(
      <div>
        <section id="title">
          <h2> Hello, S</h2>
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