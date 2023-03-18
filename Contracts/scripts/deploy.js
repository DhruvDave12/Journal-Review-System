const { ethers } = require("hardhat");

async function main() {
  const JournalFactory = await ethers.getContractFactory(
    "JournalReviewFactory"
  );
  const journalFactory = await JournalFactory.deploy();

  await journalFactory.deployed();

  console.log(
    `Journal Review Factory deployed to address: ${journalFactory.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
