pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./Wallet.sol";


/**
* @title WaterTrackingToken
* @dev Allows users to verify their water release and gives regulators a
* way to track water through the stream system for baking downstream. An
* approved verifier mints a token, the token is sent to the address of the
* water releaser/conserver, and the releaser and verifier are both approved
* to withdraw their payment from the Wallet contract.
*/
contract WaterTrackingToken is ERC721Token, Ownable {
    
    using SafeMath for uint;

    Wallet public walletContract;                 // The wallet contract to approve payments to verifiers and releasers from
    address public verifier;                      // Address of NGO that verifies release of water right
    uint public RELEASERPAYMENTPERACREFT = 1;     // How much to pay releaser per acre-ft of water released (in Wei)
    uint public VERIFIERPAYMENTPERACREFT = 1;     // How much to compensate the verifier for negotiating water release (in Wei)
    uint releaseCount;                            // Releases made (to be incremented and used for tokenIds)

    mapping (uint => WaterRelease) waterTracker;    // tokenId => waterReleas, keep track of each release and banked water

    struct WaterRelease {
        uint acreftReleased;    // How much water was released from the water right
        bytes32 streamInfo;      // Stream/reach/watershed info
        bytes32 destination;    // Reservoir/storage/stream reach destination
    }
  
    /**
    * @dev constructor function
    */
    constructor(address _verifier, address _walletContractAddress) ERC721Token("WaterTrackingNFT", "WTT") public {
        require(_verifier != address(0), "Verifier address cannot be empty");
        require(_walletContractAddress != address(0), "Water offset contract address cannot be empty");
        verifier = _verifier;
        walletContract = Wallet(_walletContractAddress);
    }

    /**
    * @dev Throws if called by any account that is not an approved verifier.
    */
    modifier onlyVerifier() {
        require (msg.sender == verifier, "Only an approved verifier can mint Water Tracking Tokens");
        _;
    }

    /**
    * @dev creates ERC721 water tracking tokens. Must be called by an approved
    * verifier. Sends the token to the address of the water releaser, and
    * approves the releaser and verifier to withdraw their payment from the
    * wallet contract.
    * @param _releaser The address of the water rights holder who is releasing
    * a portion of their water right.
    * @param _acreftReleased The volume of water released or passed downstream (in acre-ft)
    * @param _streamInfo The stream name and watershed
    * @param _destination The downstream reservoir that the water is to be "banked" in
    */
    function mintToken
    (
        address _releaser, 
        uint _acreftReleased, 
        bytes32 _streamInfo, 
        bytes32 _destination
    ) 
        public 
        onlyVerifier 
        returns (bool)
    {
        uint releaserPayment = _acreftReleased.mul(RELEASERPAYMENTPERACREFT);
        uint verifierPayment = _acreftReleased.mul(VERIFIERPAYMENTPERACREFT);

        // Approve releaser and verifier to withdraw payments from Wallet contract
        walletContract.approvePayments(_releaser, msg.sender, releaserPayment, verifierPayment);
        
        // Increment the number of releases (for use as tokenId's)
        releaseCount = releaseCount.add(1);

        // Mint a water tracking token for the releaser. (inherited from ERC721Token)
        _mint(_releaser, releaseCount);

        // Store token metadata
        waterTracker[releaseCount].acreftReleased = _acreftReleased;
        waterTracker[releaseCount].streamInfo = _streamInfo;
        waterTracker[releaseCount].destination = _destination;

        return true;
    }

    /**
    * @dev Returns the metadata associated with a user's token
    * @param _tokenId The tokenId of the token of interest. This tokenId
    * can be retrieved using standard ERC721 token functions
     */
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

}