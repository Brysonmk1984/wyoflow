pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";


/**
* @title WaterOffsetToken
* @dev ERC20 Mintable Token representing a water footprint offset creedit
*/
contract WaterOffsetToken is Ownable, MintableToken {

    string public name = "Water Offset Token";
    string public symbol = "WOT";
    uint public decimals = 0;

}
