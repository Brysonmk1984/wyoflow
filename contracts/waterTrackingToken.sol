pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
// import "./WaterOffsetToken.sol";
import "./Wallet.sol";

// TODO: 
// - change mint permissions
// - check/fix mintToken function in this contract
// - Balance of all contract accounts == 0 even after purchasing tokens??
// - change migrations to auto-set waterTrackingContract address
// - add Dai integration

contract WaterTrackingToken is ERC721Token, Ownable {
    using SafeMath for uint;

    address public verifier;                      // Address of NGO that verifies release of water right
    uint public RELEASERPAYMENTPERACREFT = 1;   // How much to pay releaser per acre-ft of water released (in Wei)
    uint public VERIFIERPAYMENTPERACREFT = 1;   // How much to compensate the verifier for negotiating water release (in Wei)
    uint releaseCount;                            // Releases made (to be incremented and used for tokenIds)
    // WaterOffsetToken public waterOffsetTokenContract;
    Wallet public walletContract;
    
    constructor(address _verifier, address _walletContractAddress) ERC721Token("WaterTrackingNFT", "WTT") public {
        require(_verifier != address(0), "Verifier address cannot be empty");
        require(_walletContractAddress != address(0), "Water offset contract address cannot be empty");
        verifier = _verifier;
        walletContract = Wallet(_walletContractAddress);
    }

    struct WaterRelease {
        uint acreftReleased;    // How much water was released from the water right
        bytes32 streamInfo;      // Stream/reach/watershed info
        bytes32 destination;    // Reservoir/storage/stream reach destination
    }

    mapping (uint => WaterRelease) waterTracker;    // tokenId => waterReleas, keep track of each release and banked water

    function mintToken
    (
        address _releaser, 
        uint _acreftReleased, 
        bytes32 _streamInfo, 
        bytes32 _destination
    ) public returns (bool)
    {
        require (msg.sender == verifier);
        uint releaserPayment = _acreftReleased.mul(RELEASERPAYMENTPERACREFT);
        uint verifierPayment = _acreftReleased.mul(VERIFIERPAYMENTPERACREFT);
        walletContract.approvePayments(_releaser, msg.sender, releaserPayment, verifierPayment);
        releaseCount = releaseCount.add(1);
        _mint(_releaser, releaseCount);

        waterTracker[releaseCount].acreftReleased = _acreftReleased;
        waterTracker[releaseCount].streamInfo = _streamInfo;
        waterTracker[releaseCount].destination = _destination;

        return true;
    }

    

    function getTokenInfo(uint _tokenId) public view returns 
    (
        uint acreftReleased,    // How much water was released from the water right
        bytes32 streamInfo,     // Stream/reach/watershed info
        bytes32 destination     // Reservoir/storage/stream reach destination
    )
    {
        acreftReleased = waterTracker[_tokenId].acreftReleased;
        streamInfo = waterTracker[_tokenId].streamInfo;
        destination = waterTracker[_tokenId].destination;
    }

    // owner functions to change payment constants
}