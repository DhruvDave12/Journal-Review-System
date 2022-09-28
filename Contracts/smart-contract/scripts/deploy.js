const hre = require("hardhat");

async function main() {

  const JournalReview = await hre.ethers.getContractFactory("JournalReview");
  const journalreview = await JournalReview.deploy();

  console.log("JournalReview Contract deployed to : ", journalreview.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
