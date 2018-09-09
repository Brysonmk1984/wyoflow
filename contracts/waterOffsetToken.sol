pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/MintableToken.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract WaterOffsetToken is Ownable, MintableToken {
    using SafeMath for uint;

    string public name = "Water Offset Token";
    string public symbol = "WOT";
    uint public decimals = 0;

    address private waterTrackingContractAddress;

    mapping (address => uint) private approvedPayments; // Payments approved for removal from contract
    uint private totalApprovedPayments;                 // Value of total pending payments

    function approvePayments
    (
        address _releaser,
        address _verifier,
        uint _releaserPayment, 
        uint _verifierPayment
    ) 
    onlyOwner external returns (bool) 
    {
        // This function can only be called from WaterTrackingToken contract
        require(msg.sender == waterTrackingContractAddress, "Only the Water Tracking Token Contract can approve payments.");

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

    function claimPayment() public returns (uint) {
        require(approvedPayments[msg.sender] > 0, "Sender has no approved payments to withdraw");
        uint payment = approvedPayments[msg.sender];
        approvedPayments[msg.sender] = 0;
        totalApprovedPayments = totalApprovedPayments.sub(payment);
        msg.sender.transfer(payment);
    }
    // TODO: This is obviously a major security vulnerability, but it's also 4am so f* it
    // Override the default modifier and allow anyone to mint tokens
    modifier hasMintPermission() {
        _;
    }

    function changeWaterTrackingContractAddress(address _newAddress) onlyOwner public {
        require(_newAddress != address(0), "New address cannot be empty");
        waterTrackingContractAddress = _newAddress;
    }

}