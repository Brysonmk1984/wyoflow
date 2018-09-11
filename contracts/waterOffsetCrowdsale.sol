pragma solidity ^0.4.24;

import "./WaterOffsetToken.sol";
import "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";


/**
* @title WaterOffsetCrowdsale
* @dev Creates the crowdsale for Water Tracking Tokens
*/
contract WaterOffsetCrowdsale is MintedCrowdsale {
    // Price is set to $2/token at current ETH Price
    // TODO: Require payment in dai so price of water offset is set ~in USD

    using SafeMath for uint;

    // TODO: RATE is currently set for easy testing. Not a reasonable rate
    uint RATE = 1; 
    
    /**
    * @dev constructor function. Provides parameters for Crowdsale constructor
    * @param _wallet Address to send funds from token sale
    * @param _waterOffsetToken The token to be sold
    */
    constructor(address _wallet, MintableToken _waterOffsetToken) 
        public 
        Crowdsale(RATE, _wallet, _waterOffsetToken)
    {}

}