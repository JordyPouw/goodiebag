const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('GoodieBagNFT', function() {
	it('Should return the right name and symbol', async function() {
		const GoodieBagNFT = await hre.ethers.getContractFactory('GoodieBagNFT');
		const goodieBagNFT = await GoodieBagNFT.deploy('GoodieBagNFT', 'GBN');

		await goodieBagNFT.deployed();
		expect(await goodieBagNFT.name()).to.equal('GoodieBagNFT');
		expect(await goodieBagNFT.symbol()).to.equal('GBN');
	});
});
