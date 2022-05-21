const fs = require('fs');

async function main() {
  const GoodieBagNFT = await hre.ethers.getContractFactory('GoodieBag');
  const goodieBagNFT = await GoodieBagNFT.deploy();

  await goodieBagNFT.deployed();

  console.log('GoodieBagNFT deployed to:', goodieBagNFT.address);

  /* this code writes the contract addresses to a local */
  /* file named config.js that we can use in the app */
  fs.writeFileSync(
    './src/config.js',
    `
		export const contractAddress = "${goodieBagNFT.address}";
  		export const ownerAddress = "${goodieBagNFT.signer.address}";
  		`,
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
