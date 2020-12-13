
module.exports = {
  networks: {
    genache:{
      host:"localhost",
      port:7545,
      gas:5000000,
      network_id:"*"
    }
  },
  compilers: {
    solc: {
       version: "0.4.25",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
};
