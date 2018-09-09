import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './Components/Header';
import Subheader from './Components/Subheader';
import Buyers from './Components/Buyers';
import Sellers from './Components/Sellers';
import Validators from './Components/Validators';

// Web3 and contracts
import getWeb3 from './utils/getWeb3';
import WaterTrackingToken from './build/contracts/WaterTrackingToken.json';
import WaterOffsetToken from './build/contracts/WaterOffsetToken.json';
import WaterOffsetCrowdsale from './build/contracts/WaterOffsetCrowdsale.json';

class App extends Component {
  constructor(){
    super();
    this.state = {
      // activeUser : '0x895B758229aFF6C0f95146A676bBF579aD7636aa',
      web3: null,
      accounts: null,
      trackingToken: null,
      offsetToken: null,
      offsetCrowdsale: null,
    };
  }

  componentWillMount() {
    getWeb3.then(results => {
      this.setState({
        web3: results.web3
      })
      this.instantiateContracts();
    })
    .cathc(() => {
      console.log("Error finding web3.")
    })
  }

  componentDidMount(){

    //////////////////
    // IMPORTANT TODO: Need to set waterTokenContractAddress in WaterOffsetToken contract after all contracts deployed

  }

  instantiateContracts() {
    const contract = require('truffle-contract');

    // Instantiate WaterOffsetToken contract
    const offsetToken = contract(WaterOffsetToken)
    offsetToken.setProvider(this.state.web3.currentProvider)

    // Instantiate WaterTrackingToken contract
    const trackingToken = contract(WaterTrackingToken)
    trackingToken.setProvider(this.state.web3.currentProvider)

    // Instantiate WaterOffsetCrowdsale contract
    const offsetCrowdsale = contract(WaterOffsetCrowdsale)
    offsetCrowdsale.setProvider(this.state.web3.currentProvider)

    // Deploy contracts
    offsetToken.deployed().then((offsetTokenInstance) => {
      trackingToken.deployed().then((trackingTokenInstance) => {
        offsetCrowdsale.deployed().then((offsetCrowdsaleInstance) => {
          this.setState({
            trackingToken: trackingTokenInstance,
            offsetToken: offsetTokenInstance,
            offsetCrowdsale: offsetCrowdsaleInstance,
          })
        })
      })
    })

    // Get accounts
    this.state.web3.eth.getAccounts((error, accounts) => { 
      this.setState({
        accounts: accounts
      }, () => {
        // IMPORTANT: don't take this out. Needed to correctly deploy interdependent token contracts
        // Set the waterTrackingContractAddress variable in the WaterOffsetToken contract
        console.log(this.state.trackingToken.address);
        this.state.offsetToken.changeWaterTrackingContractAddress(this.state.trackingToken.address, {from: accounts[0]});
      })       
    })

  }

  render() {
    return (
      <div className="App">
        {/* <Header />
        <Subheader />
        <Switch>
          <Route exact path='/' render={() => <Buyers activeUser={ this.state.accounts[0] }/>}  />
          <Route path='/buyers'  render={() => <Buyers activeUser={ this.state.accounts[0] }/>} />
          <Route path='/sellers'  render={() => <Sellers activeUser={ this.state.accounts[0] }/>} />
          <Route path='/validators'  render={() => <Validators activeUser={ this.state.accounts[0] }/>} />
        </Switch> */}
      </div>
    );
  }
}

export default App;
