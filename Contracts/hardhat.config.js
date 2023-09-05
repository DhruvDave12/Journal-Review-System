require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
    polygon_mumbai: {
      url: "https://tame-cosmopolitan-violet.matic-testnet.discover.quiknode.pro/3e6de038de14a63965f8bd96cc3c52b4d32fc918/",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
