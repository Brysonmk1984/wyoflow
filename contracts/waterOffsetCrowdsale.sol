pragma solidity ^0.4.24;

import "./WaterOffsetToken.sol";
import "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract WaterOffsetCrowdsale is MintedCrowdsale {
    // Price is set to $2/token at current ETH Price
    // TODO: Require payment in dai so price of water offset is set ~in USD

    using SafeMath for uint;
    // TODO: FIX RATE
    uint RATE = 1; 
    
    constructor(address _wallet, MintableToken _waterOffsetToken) 
        public 
        Crowdsale(RATE, _wallet, _waterOffsetToken)
    {}

}