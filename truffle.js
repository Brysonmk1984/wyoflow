var HDWalletProvider = require("truffle-hdwallet-provider");
// Test account. Please don't steal our Kovan ETH. But, if you do, props to you for digging through random github repos for testnet ETH
var mnemonic = "earn upon urban cannon inspire topic seven call soda menu sport carbon";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // match any network
    },
    kovan: {
      // TODO: highly inseccure
      host: "https://kovan.infura.io/v3/5e47e88b288e435e99222e75f7d990d6",
      provider: () => {return new HDWalletProvider(mnemonic, "https://kovan.infura.io/v3/5e47e88b288e435e99222e75f7d990d6")},
      network_id: '*',
      gas: 4700000
    },
  }
};
