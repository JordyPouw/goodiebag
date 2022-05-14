const { expect } = require("chai");
const { ethers } = require("hardhat");
const {
  abi: WETH,
} = require("@uniswap/v3-periphery/artifacts/contracts/interfaces/external/IWETH9.sol/IWETH9.json");

const ETH = ethers.BigNumber.from((1e18).toString());

async function printBalances(address) {
  const wmatic = await ethers.getContractAt(
    "IERC20",
    "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
  );
  const wmaticBalance = await wmatic.balanceOf(address);
  console.log("WMATIC BALANCE", wmaticBalance.toString());
}

describe("Checks", function () {
  it("should be tested on fork", async function () {
    const [owner] = await ethers.getSigners();
    console.log("WALLET", owner.address);
    const balance = await owner.provider.getBalance(owner.address);
    expect(balance.toString()).to.equal("10000000000000000000000");
  });
});

async function printGoodieTokens(goodieBag, token) {
  const goodieTokenCount = await goodieBag.getGoodieTokenCount(token);
  for (let i = 0; i < goodieTokenCount; i++) {
    const goodieTokenAddress = await goodieBag.getGoodieTokenAddress(
      token,
      i.toString()
    );
    const goodieTokenBalance = await goodieBag.getGoodieTokenBalance(
      token,
      goodieTokenAddress
    );
    console.log("Goodie Tokens");
    console.log(goodieTokenAddress.toString(), goodieTokenBalance.toString());
  }
}
describe("GoodieBag", function () {
  let GoodieBag, goodieBag, owner;
  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    GoodieBag = await ethers.getContractFactory("GoodieBag");
    goodieBag = await GoodieBag.deploy();
    await goodieBag.deployed();
  });
  it("Mint goodiebag with 5 matic", async () => {
    await goodieBag.connect(owner).mint({ value: ETH.mul(5) });
    await printBalances(owner.address);
    await printGoodieTokens(goodieBag, "0");
  });
  it("Redeem goodiebag", async () => {
    await goodieBag.connect(owner).mint({ value: ETH.mul(5) });
    await goodieBag.connect(owner).redeem("0");
    await printBalances(owner.address);
    await printGoodieTokens(goodieBag, "0");
  });
});
