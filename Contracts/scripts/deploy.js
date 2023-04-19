const { ethers } = require("hardhat");

async function main() {
  const JournalReview = await ethers.getContractFactory("JournalReview");
  const journalReview = await JournalReview.deploy();

  await journalReview.deployed();

  console.log(
    `Journal Review Factory deployed to address: ${journalReview.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
