const WaterOffsetToken = artifacts.require('./WaterOffsetToken.sol');
const WaterOffsetCrowdsale = artifacts.require('./WaterOffsetCrowdsale.sol');
const WaterTrackingToken = artifacts.require('./WaterTrackingToken.sol');
const Wallet = artifacts.require('./Wallet.sol');

module.exports = function(deployer, network, accounts) {
    const owner = accounts[0]
    const verifier = accounts[0];
    var waterOffsetTokenInst;
    deployer.deploy(Wallet).then((walletInst) =>
        deployer.deploy(
            WaterTrackingToken,
            verifier,
            Wallet.address
        )
        .then(() => deployer.deploy(WaterOffsetToken))
        .then((inst) => {
            waterOffsetTokenInst = inst;
            return deployer.deploy(
                WaterOffsetCrowdsale,
                Wallet.address,
                WaterOffsetToken.address
            )
        })
        .then(() => {
            walletInst.changeWaterTrackingTokenContractAddress(
                WaterTrackingToken.address,
                {from:owner}
            );
            return waterOffsetTokenInst.transferOwnership(
                WaterOffsetCrowdsale.address,
                {from:owner} 
            );
        })
    );
};