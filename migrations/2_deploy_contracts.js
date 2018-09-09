const waterOffsetToken = artifacts.require('./waterOffsetToken.sol');
const waterOffsetCrowdsale = artifacts.require('./waterOffsetCrowdsale.sol');

module.exports = function(deployer, accounts) {
    const wallet = accounts[1]
    return deployer
        .then(() => {
            return deployer.deploy(waterOffsetToken);
        })
        .then(() => {
            return deployer.deploy(
                waterOffsetCrowdsale,
                wallet,
                waterOffsetToken.address
            )
        })
};