pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract waterOffsetToken is Ownable, MintableToken {
    /*
    ** dynamic pricing? - based on some measure of water scarcity in the basin
    - make an initial distribution of enough to fund initial water rights purchases + buffer
    - then, tokens can only be approved for minting when an 
    - OR, just allow continuous funding of this contract
        - BUT, do we want to limit supply for future resale if value of water conservation goes up?
    - Whenever a waterTrackingToken is minted, the water rights holder will have funds approved for him to claim
    */

    string public name = "Water Offset Token";
    string public symbol = "WOT";
    uint public decimals = 0;

}