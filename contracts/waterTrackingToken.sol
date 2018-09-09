pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract waterTrackingToken is ERC721Token, Ownable {
    address public verifier;        // Address of NGO that verifies release of water right
    uint public RELEASERPAYMENTPERACREFT = 1.5;   // How much to pay releaser per acre-ft of water released
    uint public VERIFIERPAYMENTPERACREFT = 0.5;   // How much to compensate the verifier for negotiating water release
    

    constructor(address _verifier) ERC721Token("WaterTrackingNFT", "WTT") {
        verifier = _verifier;
    }

    struct WaterRelease {
        uint acreftReleased;    // How much water was released from the water right
        // uint streamId;          // Id of stream in streams mapping
        bytes32 streamInfo;      // Stream/reach/watershed info
        bytes32 destination;    // Reservoir/storage/stream reach destination
    }

    mapping (uint => waterRelease) waterTracker;    // Keep track of each release/banked water

    // mapping(uint => bytes32) streams;   // Stream/reach/watershed info

    function mintToken(
        address _releaser, 
        uint _acreftReleased, 
        bytes32 streamInfo, 
        bytes32 destination
    ) 
    {
        require (msg.sender == verifier);
        uint releaserPayment = _acreftReleased * RELEASERPAYMENTPERACREFT;
        uint verifierPayment = _acreftReleased * VERIFIERPAYMENTPERACREFT;
        uint totalPayment = releaserPayment + verifierPayment;
        if (isThereEnoughMoney(totalPayment)) 
        {
            approve _releaser to claim paymentAmount from ERC20 contract
        }
        ** also, pay additional funding amount out to verifier, or whatever conservation org.
        facilitated the transfer. Could have an addresses approvedConservationOrgs[];
        _mint a token;
        add waterTrackingStructInfo to whereIsTheWater[tokenId];
    }

    function isThereEnoughMoney(uint _payment) {
        if paymentAmount is less than the 
            current balance of the ERC20 contract + 
            all currently approved payouts 
        {
            return true;
        }
        return false;
    }

    function getTokenInfo(uint _tokenId) public view returns 
    (
        uint acreftReleased;    // How much water was released from the water right
        bytes32 streamInfo;      // Stream/reach/watershed info
        bytes32 destination;    // Reservoir/storage/stream reach destination
    )
    {
        acreftReleased = waterTracker[_tokenId].acreftReleased;
        streamInfo = waterTracker[_tokenId].streamInfo;
        destination = waterTracker[_tokenId].destination;
    }

    // owner functions to change payment constants
}