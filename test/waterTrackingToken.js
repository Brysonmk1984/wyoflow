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

    it("Should revert calls to WaterTrackingToken mintToken() function if insufficient funds in Wallet.", async () => {
        await expectThrow(trackingToken.mintToken(
            releaser,
            ACREFTRELEASED,
            STREAMINFO,
            DESTINATION,
            {from:verifier}
        ), EVMRevert);
    });

    it("Should correctly execute WaterTrackingToken mintToken() function.", async () => {
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
        
        // Check that token is minted with correct info

        // Get info for desired token
        userBalance = await trackingToken.balanceOf(releaser);
        userTokenIndex = userBalance.minus(1);
        newTokenId = await trackingToken.tokenOfOwnerByIndex(releaser, userTokenIndex.toString());
        tokenInfo = await trackingToken.getTokenInfo(newTokenId);

        // Check that token was minted with correct _acreftReleased value
        tokenAcreftReleased = tokenInfo[0];
        assert.equal(tokenAcreftReleased.toString(), ACREFTRELEASED, "Token was minted with incorrect _acreftReleased value.");
        
        // Check that token was minted with correct _streamInfo value
        tokenStreamInfo = web3.toUtf8(tokenInfo[1]);
        assert.equal(tokenStreamInfo, STREAMINFO, "Token was minted with incorrect _streamInfo value.");
        
        // Check that token was minted with correct _destination value
        tokenDestination = web3.toUtf8(tokenInfo[2]);
        assert.equal(tokenDestination, DESTINATION, "Token was minted with incorrect _destination value");

    });
})