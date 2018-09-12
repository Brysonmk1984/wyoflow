const waterTrackingToken = artifacts.require("../contracts/WaterTrackingToken");
const WaterOffsetCrowdsale = artifacts.require("../contracts/WaterOffsetCrowdsale");
const WaterOffsetToken = artifacts.require("../contracts/WaterOffsetToken");
const Wallet = artifacts.require("../contracts/Wallet");
const BigNumber = require('bignumber.js');
const assert = require('assert');
const { expectThrow } = require('./helpers/expectThrow');

const EVMRevert = "revert";

contract("WaterOffsetCrowdsale", (accounts) => {
    // Contracts
    let trackingToken;
    let crowdsale;
    let wallet;
    let offsetToken;

    // Testing accounts
    let owner;
    let verifier;
    let releaser;
    let anyone;

    // Number of tokens to purchase in a buyTokens() test
    let NUMTOKENS = 500;

    // Constant values for ERC721 token minting
    let ACREFTRELEASED = 10;
    let STREAMINFO = "Colorado River";
    let DESTINATION = "Lake Powell";

    before("Setup contracts", async () => {
        // Retrieve contract instances
        trackingToken = await waterTrackingToken.deployed();
        crowdsale = await WaterOffsetCrowdsale.deployed();
        offsetToken = await WaterOffsetToken.deployed();
        wallet = await Wallet.deployed();

        // Set test accounts
        owner = accounts[0];
        verifier = accounts[1];
        releaser = accounts[2];
        anyone = accounts[3];

        // Set verifier in WaterTrackingToken contract
        trackingToken.changeApprovedVerifier(verifier, {from: owner});
        let setVerifier = await trackingToken.verifier();
        assert.equal(setVerifier, verifier, "Verifier was not correctly changed in WaterTrackingToken contract.")
    });

    it("Should revert calls to claimPayment() if no payments have been approved.", async () => {
        await expectThrow(wallet.claimPayment({from:owner}), EVMRevert);
    });

    it("Should restrict calls to approvePayment() to the WaterTrackingToken Contract.", async () => {
        // Check that the WaterTrackingToken contract address is correctly initialized
        let trackingTokenAddress = await wallet.waterTrackingTokenContractAddress();
        let actualTrackingTokenAddress = trackingToken.address;
        assert.equal(trackingTokenAddress, actualTrackingTokenAddress, "waterTrackingTokenContractAddress was incorrectly set in Wallet contract.")

        // Check that approvePayment() cannot be called by an address that isi not the WaterTrackingToken contract
        await expectThrow(wallet.approvePayments(releaser, verifier, 1, 1, {from:owner}), EVMRevert);
    })

    it("Should allow both releaser and verifier to claim the correct payments.", async () => {
        // rate = number of token units / wei
        // where one token unit is the smallest indivisible quantity
        // of the token that can be purchased. i.e. if token decimals
        // are set to 3, one token unit is 0.001 tokens
        let rate = await crowdsale.rate();
        let decimals = await offsetToken.decimals();
    
        // token units / token = 10^(decimals)
        let ten = new BigNumber(10);
        let tokenUnitsPerToken = ten.pow(decimals);

        // weiPerToken = tokenUnitsPerToken / rate
        let weiPerToken = tokenUnitsPerToken.div(rate);

        // total token cost = NUMTOKENS * weiPerToken
        let numTokens = new BigNumber(NUMTOKENS);
        let totalTokenCost = numTokens.times(weiPerToken);

        // Execute buyTokens(address _beneficiary);
        await crowdsale.buyTokens(anyone, {from:anyone, value:totalTokenCost.toString()});

        // Execute mintToken()
        await trackingToken.mintToken(
            releaser,
            ACREFTRELEASED,
            STREAMINFO,
            DESTINATION,
            {from: verifier}
        )

        // Check that claimPayment() works correctly for releaser

        // Determine expected payment for releaser
        releaserPaymentPerAcreft = await trackingToken.RELEASERPAYMENTPERACREFT();
        expectedReleaserPayment = releaserPaymentPerAcreft.times(ACREFTRELEASED);

        // Execute claimPAyment() from releaser account
        let releaserInitialBalance = web3.eth.getBalance(releaser);
        const receipt1 = await wallet.claimPayment({from:releaser});

        // Calculate gas cost of tx
        const gasUsed1 = receipt1.receipt.gasUsed;
        const tx1 = await web3.eth.getTransaction(receipt1.tx);
        const gasPrice1 = tx1.gasPrice;
        const gasCost1 = gasUsed1 * gasPrice1;

        // Calculate the amount payed to the releaser
        let releaserFinalBalance = web3.eth.getBalance(releaser);
        const releaserBalanceChange = releaserFinalBalance.minus(releaserInitialBalance).plus(gasCost1);

        // Check that releaser was paid expected amount
        assert.equal(releaserBalanceChange.toString(), expectedReleaserPayment.toString(), "The releaser was not correctly transferred funds by claimPayment().");
        
        // Check that claimPayment() works correctly for verifier

        // Determine expected payments for verifier
        verifierPaymentPerAcreft = await trackingToken.VERIFIERPAYMENTPERACREFT();
        expectedVerifierPayment = verifierPaymentPerAcreft.times(ACREFTRELEASED);

        // Execute claimPAyment() from releaser account
        let verifierInitialBalance = web3.eth.getBalance(verifier);
        const receipt2 = await wallet.claimPayment({from:verifier});

        // Calculate gas cost of tx
        const gasUsed2 = receipt2.receipt.gasUsed;
        const tx2 = await web3.eth.getTransaction(receipt2.tx);
        const gasPrice2 = tx2.gasPrice;
        const gasCost2 = gasUsed2 * gasPrice2;

        // Calculate the amount payed to the releaser
        let verifierFinalBalance = web3.eth.getBalance(verifier);
        const verifierBalanceChange = verifierFinalBalance.minus(verifierInitialBalance).plus(gasCost2);

        // Check that releaser was paid expected amount
        assert.equal(verifierBalanceChange.toString(), expectedVerifierPayment.toString(), "The verifier was not correctly transferred funds by claimPayment().");

        
        // Check that the same payment can not be claimed again
        await expectThrow(wallet.claimPayment({from:releaser}), EVMRevert);

    });
})