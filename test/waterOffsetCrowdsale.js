const WaterOffsetCrowdsale = artifacts.require("../contracts/WaterOffsetCrowdsale");
const WaterOffsetToken = artifacts.require("../contracts/WaterOffsetToken");
const Wallet = artifacts.require("../contracts/Wallet");
const BigNumber = require('bignumber.js');
const assert = require('assert');
const { expectThrow } = require('./helpers/expectThrow');

const EVMRevert = "revert";

contract("WaterOffsetCrowdsale", (accounts) => {
    // Contracts
    let crowdsale;
    let wallet;
    let offsetToken;

    // Testing accounts
    let owner;
    let anyone;

    // Number of tokens to purchase in a buyTokens() test
    let NUMTOKENS = 500;

    before("Setup contracts", async () => {
        // Retrieve contract instances
        crowdsale = await WaterOffsetCrowdsale.deployed();
        offsetToken = await WaterOffsetToken.deployed();
        wallet = await Wallet.deployed();

        // Set test accounts
        owner = accounts[0];
        anyone = accounts[3];
    });

    it("Should set Token contract owner as the Crowdsale contract.", async () => {
        offsetTokenOwner = await offsetToken.owner();
        offsetCrowdsaleAddress = crowdsale.address;
        assert.equal(offsetTokenOwner, offsetCrowdsaleAddress, "Crowdsale contract should be owner of WaterOffsetToken contract.");
    });

    it("Should restrct minting tokens to the crowsale contract.", async () => {
        // All calls to mint() should fail except from the crowdsale contract
        await expectThrow(offsetToken.mint(owner, 50, {from:owner}), EVMRevert);
        await expectThrow(offsetToken.mint(anyone, 50, {from:anyone}), EVMRevert);
    })

    it("Should correctly execute buyTokens.", async () => {
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
        
        // Check that user recieved tokens paid for
        let userBalance = await offsetToken.balanceOf(anyone);
        assert.equal(userBalance.toString(), numTokens.toString(), "User was not given the correct number of tokens after buyTokens().")
        
        // Check that balance of Wallet contract was updated correctly
        let walletBalance = web3.eth.getBalance(wallet.address);
        assert.equal(walletBalance.toString(), totalTokenCost.toString(), "Funds were not correctly transferred to Wallet contract.");
    });
})