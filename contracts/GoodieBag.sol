//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

import 'hardhat/console.sol';

/// @title Interface for WETH9
interface IWETH9 is IERC20 {
  /// @notice Deposit ether to get wrapped ether
  function deposit() external payable;

  /// @notice Withdraw wrapped ether to get ether
  function withdraw(uint256) external;
}

contract GoodieBag is ERC721Enumerable {
  using Counters for Counters.Counter;

  struct NFTBalance {
    address[] tokens;
    // I guess the adress of the token in this case is the id?
    mapping(address => uint256) balance;
  }

  // Counter for the NFT
  Counters.Counter private _tokenIds;

  // Related contracts
  IWETH9 constant wmatic = IWETH9(0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270);
  address constant eth = address(0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619);
  ISwapRouter constant router =
    ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

  // Where we store tokenbalance per NFT
  mapping(uint256 => NFTBalance) tokenBalances;

  constructor() ERC721('GoodieBag', 'GBag') {}

  function getNFTTokenCount(uint256 nft) public view returns (uint256) {
    return tokenBalances[nft].tokens.length;
  }

  function getNFTTokenAddress(uint256 nft, uint256 index)
    public
    view
    returns (address)
  {
    return tokenBalances[nft].tokens[index];
  }

  function getNFTTokenBalance(uint256 nft, address tokenAddress)
    public
    view
    returns (uint256)
  {
    return tokenBalances[nft].balance[tokenAddress];
  }

  // Mint and fill NFT
  function mint() external payable {
    require(msg.value > 0);
    // Swap Matic for WMatic
    wmatic.deposit{value: msg.value}();
    // Mint NFT
    uint256 newItemId = _tokenIds.current();
    _tokenIds.increment();
    _mint(msg.sender, newItemId);

    // Add 50% as WMATIC
    _updateBalance(newItemId, address(wmatic), msg.value / 2);
    // Add 50% as ETH
    uint256 ethAmount = _swapToEth(msg.value / 2);
    _updateBalance(newItemId, eth, ethAmount);
  }

  // Redeem your the token balances from the NFT
  function redeem(uint256 token) external {
    require(_exists(token), "token does not exist");

    // Check if you own the token
    require(ownerOf(token) == msg.sender, 'Not allowed');
    NFTBalance storage tokenBalance = tokenBalances[token];

    // Balance before
    console.log("BEFORE token: ", 0 , " balance is: ", tokenBalance.balance[tokenBalance.tokens[0]]);
    console.log("BEFORE token: ", 1 , " balance is: ", tokenBalance.balance[tokenBalance.tokens[1]]);

    // Redeem the selected token
    address tokenAddress = tokenBalance.tokens[token];
    uint256 balance = tokenBalance.balance[tokenAddress];
    
    if (balance > 0) {
      tokenBalance.balance[tokenAddress] = 0;
      IERC20(tokenAddress).transfer(msg.sender, balance);
    }

    // Check the other tokens to make sure that they are not redeemed
    for(uint i = 0; i<tokenBalance.tokens.length; i++){
      console.log("AFTER token: ", tokenBalance.tokens[i] , " balance is: " , tokenBalance.balance[tokenBalance.tokens[i]]);
    }

  }

  // Swap WMatic to ETH
  function _swapToEth(uint256 value) internal returns (uint256 ethAmount) {
    wmatic.approve(address(router), value);
    ethAmount = _swapExact(
      abi.encodePacked(address(wmatic), uint24(500), eth),
      value
    );
  }

  // Swap with uniswap
  function _swapExact(bytes memory path, uint256 value)
    internal
    returns (uint256 amountOut)
  {
    ISwapRouter.ExactInputParams memory params = ISwapRouter.ExactInputParams({
      path: path,
      recipient: address(this),
      deadline: block.timestamp,
      amountIn: value,
      amountOutMinimum: 0
    });

    amountOut = router.exactInput(params);
  }

  // Update the token balance of an NFT
  function _updateBalance(
    uint256 nft,
    address token,
    uint256 value
  ) internal {
    NFTBalance storage tokenBalance = tokenBalances[nft];
    if (tokenBalance.balance[token] == 0) {
      tokenBalance.tokens.push(token);
    }
    tokenBalance.balance[token] += value;
  }
}
