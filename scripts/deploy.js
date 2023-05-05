const hre = require("hardhat");

async function main() {
  const Pizza = await hre.ethers.getContractFactory("Pizza"); // fetching bytecode and ABI
  const pizza = await Pizza.deploy(); //Creating an instance of our smart contract

  await pizza.deployed(); //Deploying

  console.log("Deployed Contract Address:", `${pizza.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

//Deployed Contract Address: 0x698B0ef766ddf85D13D54d4b5C8d3eaE9Ca4a176
