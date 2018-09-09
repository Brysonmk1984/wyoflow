const WaterOffsetToken = artifacts.require('./WaterOffsetToken.sol');
const WaterOffsetCrowdsale = artifacts.require('./WaterOffsetCrowdsale.sol');
const WaterTrackingToken = artifacts.require('./WaterTrackingToken.sol');

module.exports = function(deployer, network, accounts) {
    const verifier = accounts[1];
    deployer.deploy(WaterOffsetToken).then(() => {
        deployer.deploy(
            WaterTrackingToken,
            verifier,
            WaterOffsetToken.address
        ).then(() => {
            return deployer.deploy(
                WaterOffsetCrowdsale,
                WaterOffsetToken.address
            );
        })
    });
};