const { expect } = require('chai');
const { ethers } = require('hardhat');
const {
  abi: WETH,
} = require('@uniswap/v3-periphery/artifacts/contracts/interfaces/external/IWETH9.sol/IWETH9.json');

const ETH = ethers.BigNumber.from((1e18).toString());

async function getWMatic() {
  return await ethers.getContractAt(
    'IERC20',
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  );
}

async function printTokenBalance(goodieBag, nft) {
  const count = await goodieBag.getNFTTokenCount(nft);
  for (let i = 0; i < count; i++) {
    const tokenAddress = await goodieBag.getNFTTokenAddress(nft, i);
    const tokenBalance = await goodieBag.getNFTTokenBalance(nft, tokenAddress);
    console.log(
      'Token',
      nft.toString(),
      'balance',
      tokenAddress,
      tokenBalance / ETH.toString(),
    );
  }
}

describe('Checks', function () {
  it('should be tested on fork', async function () {
    const [owner] = await ethers.getSigners();
    console.log('WALLET', owner.address);
    const balance = await owner.provider.getBalance(owner.address);
    expect(balance.toString()).to.equal('10000000000000000000000');
  });
});

describe('GoodieBag', function () {
  let GoodieBag, goodieBag, owner, account1;
  beforeEach(async () => {
    [owner, account1] = await ethers.getSigners();
    GoodieBag = await ethers.getContractFactory('GoodieBag');
    goodieBag = await GoodieBag.deploy();
    await goodieBag.deployed();
  });
  it('Mint goodiebag with 5 matic', async () => {
    const wmatic = await getWMatic();
    await goodieBag.connect(owner).mint({ value: ETH.mul(10) });
    const wmaticOnToken = await goodieBag.getNFTTokenBalance(
      '0',
      wmatic.address,
    );
    expect(wmaticOnToken).to.be.equal(ETH.mul(5));
  });
  it('Redeem goodiebag', async () => {
    const wmatic = await getWMatic();
    await goodieBag.connect(owner).mint({ value: ETH.mul(10) });
    await goodieBag.connect(owner).redeem('0');
    expect(await wmatic.balanceOf(owner.address)).to.be.equal(ETH.mul(5));
  });
  it('Should prevent non owners ro redeem', async () => {
    const wmatic = await getWMatic();
    await goodieBag.connect(owner).mint({ value: ETH.mul(10) });
    expect(goodieBag.connect(account1).redeem('0')).to.be.revertedWith(
      'Not allowed',
    );
  });
  it('Transfer goodiebag', async () => {
    await goodieBag.connect(owner).mint({ value: ETH.mul(5) });
    await goodieBag.connect(owner).mint({ value: ETH.mul(5) });
    await goodieBag.connect(owner).mint({ value: ETH.mul(5) });
    expect(await goodieBag.ownerOf('0')).to.be.equal(owner.address);
    await goodieBag
      .connect(owner)
      .transferFrom(owner.address, account1.address, '0');
    expect(await goodieBag.ownerOf('0')).to.be.equal(account1.address);
    for (const user of [owner, account1]) {
      console.log('Wallet', user.address);
      const balance = await goodieBag.balanceOf(user.address);
      for (let i = 0; i < balance.toNumber(); i++) {
        const tokenId = await goodieBag.tokenOfOwnerByIndex(user.address, i);
        await printTokenBalance(goodieBag, tokenId);
      }
    }
    await goodieBag.connect(account1).redeem('0');
    for (const user of [owner, account1]) {
      console.log('Wallet', user.address);
      const balance = await goodieBag.balanceOf(user.address);
      for (let i = 0; i < balance.toNumber(); i++) {
        const tokenId = await goodieBag.tokenOfOwnerByIndex(user.address, i);
        await printTokenBalance(goodieBag, tokenId);
      }
    }
  });
});
