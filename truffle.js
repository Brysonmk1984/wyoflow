var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "earn upon urban cannon inspire topic seven call soda menu sport carbon";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // match any network
    },
    // kovan: {
    //   // TODO: highly inseccure
    //   provider: () => {return new HDWalletProvider(mnemonic, "https://kovan.infura.io/v3/5e47e88b288e435e99222e75f7d990d6>")},
    //   network_id: 42,
    //   gas: 4700000
    // },
    kovan: {
      provider: () => {return new HDWalletProvider(mnemonic, "https://kovan.infura.io/v3/5e47e88b288e435e99222e75f7d990d6>")},
      host: "127.0.0.1",
      port: 8545,
      network_id: 42,
      gas: 4700000
    },
  }
};

// endpoint https://kovan.infura.io/v3/5e47e88b288e435e99222e75f7d990d6
