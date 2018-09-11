pragma solidity^0.4.24;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Wallet is Ownable {
    using SafeMath for uint;

    address public waterTrackingTokenContractAddress;
    address public creator;

    mapping (address => uint) private approvedPayments; // Payments approved for removal from contract
    uint private totalApprovedPayments;


    /**
    * @dev fallback function
    */
    function() external payable {}

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

    function claimPayment() public returns (uint) {
        require(approvedPayments[msg.sender] > 0, "Sender has no approved payments to withdraw");
        uint payment = approvedPayments[msg.sender];
        approvedPayments[msg.sender] = 0;
        totalApprovedPayments = totalApprovedPayments.sub(payment);
        msg.sender.transfer(payment);
    }

    function changeWaterTrackingTokenContractAddress(address _newAddress) public onlyOwner {
        require(_newAddress != address(0), "New address cannot be empty");
        waterTrackingTokenContractAddress = _newAddress;
    }

}