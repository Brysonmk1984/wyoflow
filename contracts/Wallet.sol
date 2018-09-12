pragma solidity^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";


/**
* @title Wallet
* @dev Stores the funds from the ERC20 crowdsale (WaterOffsetCrowdsale.sol)
* and allows for withdrawal of funds approved by the ERC721 contract
* (WaterTrackingToken.sol)
*/
contract Wallet is Ownable {

    using SafeMath for uint;

    // The address of the WaterTrackingToken contract. Set during contract 
    // deployment. (See ../migrations/2_deploy_contracts)
    address public waterTrackingTokenContractAddress;

    mapping (address => uint) internal approvedPayments; // Payments approved for removal from contract
    uint internal totalApprovedPayments;                 // Total amount of payments approved but not yet claimed

    /**
    * @dev fallback function
    */
    function() external payable {}

    /**
    * @dev Approves payments for releasers of water and vierifiers. Can
    * only be called from the WaterTrackingToken contract.
    * @param _releaser Address of the water rights holder who released or
    * otherwise passed water downstream
    * @param _verifier Address of the organization responsible for negotiating
    * the water release and mesuring the downstream flow to confirm that water
    * was released or otherwise passed downstream
    * @param _releaserPayment Amount to add to releaser's approved payment (in Wei)
    * @param _verifierPayment Amount to add to verifier's approved payment (in Wei)
    */
    function approvePayments
    (
        address _releaser,
        address _verifier,
        uint _releaserPayment, 
        uint _verifierPayment
    ) 
    external returns (bool) 
    {
        // This function can only be called from WaterTrackingToken contract
        require(msg.sender == waterTrackingTokenContractAddress, "Only the Water Tracking Token Contract can approve payments.");

        uint totalPayment = _releaserPayment.add(_verifierPayment);

        // Balance of this contract must be greater than total approved payments + totalPayment
        uint paymentsAvailable = totalApprovedPayments.add(address(this).balance);
        require(paymentsAvailable >= totalPayment, "Not enough money left available in funding contract");
        
        // Calculate new balances for releaser and verifier
        uint releaserOriginalBalance = approvedPayments[_releaser];
        uint verifierOriginalBalance = approvedPayments[_verifier];
        uint releaserNewBalance = releaserOriginalBalance.add(_releaserPayment);
        uint verifierNewBalance = verifierOriginalBalance.add(_verifierPayment);

        // Set approvedPayments for releaser and verifier to their respective new balances
        approvedPayments[_releaser] = releaserNewBalance;
        approvedPayments[_verifier] = verifierNewBalance;
        
        // Add totalPayment to totalApprovedPayments
        totalApprovedPayments = totalApprovedPayments.add(totalPayment);
        
        return true;

    }

    /**
    * @dev Called by releasers or verifiers after a WaterTrackingToken is
    * minted. Allows users to claim their payments.
    */
    function claimPayment() public returns (uint) {
        // User must be approved for a payment
        require(approvedPayments[msg.sender] > 0, "Sender has no approved payments to withdraw");
        
        // Store amount of payment owed in memory
        uint payment = approvedPayments[msg.sender];
        
        // Set user's approved payments to 0 to prevent another claim on the same payment
        approvedPayments[msg.sender] = 0;

        // Adjust totalApprovedPayments so that the WaterTrackingToken
        // contract knows the amount of pending payments. No ERC721 token
        // will be minted if there are no funds available to pay the 
        // verifier and releaser
        totalApprovedPayments = totalApprovedPayments.sub(payment);

        // Transfer payment
        msg.sender.transfer(payment);
    }

    /** 
    * @dev Changes the address to reference the WaterTrackingToken contract.
    * Can only be called by contract owner.
    * Used in contract deployment
    */
    function changeWaterTrackingTokenContractAddress(address _newAddress) public onlyOwner {
        require(_newAddress != address(0), "New address cannot be empty");
        waterTrackingTokenContractAddress = _newAddress;
    }

}