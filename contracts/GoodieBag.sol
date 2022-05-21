//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

import 'hardhat/console.sol';

/// @title Interface for WETH9
interface IWETH9 is IERC20 {
  /// @notice Deposit ether to get wrapped ether
  function deposit() external payable;

  /// @notice Withdraw wrapped ether to get ether
  function withdraw(uint256) external;
}

interface IAAVEPool {
  /**
   * @notice Supplies an `amount` of underlying asset into the reserve, receiving in return overlying aTokens.
   * - E.g. User supplies 100 USDC and gets in return 100 aUSDC
   * @dev Deprecated: Use the `supply` function instead
   * @param asset The address of the underlying asset to supply
   * @param amount The amount to be supplied
   * @param onBehalfOf The address that will receive the aTokens, same as msg.sender if the user
   *   wants to receive them on his own wallet, or a different address if the beneficiary of aTokens
   *   is a different wallet
   * @param referralCode Code used to register the integrator originating the operation, for potential rewards.
   *   0 if the action is executed directly by the user, without any middle-man
   **/
  function deposit(
    address asset,
    uint256 amount,
    address onBehalfOf,
    uint16 referralCode
  ) external;
}

contract GoodieBag is ERC721Enumerable {
  using SafeERC20 for IERC20;
  using Counters for Counters.Counter;

  event Redeem(address indexed to, uint256 indexed tokenId);

  struct NFTBalance {
    address[] tokens;
    // I guess the adress of the token in this case is the id?
    mapping(address => uint256) balance;
  }

  // Counter for the NFT
  Counters.Counter private _tokenIds;

  // Related contracts
  IWETH9 constant wmatic = IWETH9(0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270);
  IERC20 constant awmatic = IERC20(0x6d80113e533a2C0fe82EaBD35f1875DcEA89Ea97);
  address constant eth = address(0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619);
  ISwapRouter constant router =
    ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
  IAAVEPool constant aavePool =
    IAAVEPool(0x794a61358D6845594F94dc1DB02A252b5b4814aD);

  // Where we store tokenbalance per NFT
  mapping(uint256 => NFTBalance) tokenBalances;
  // Keep track of the totals
  mapping(address => uint256) tokenTotals;

  constructor() ERC721('GoodieBag', 'GBag') {}

  // Get the number of different tokens attached to this nft
  function getNFTTokenCount(uint256 nft) public view returns (uint256) {
    return tokenBalances[nft].tokens.length;
  }

  // Get the address of the token at at specific index on this nft
  function getNFTTokenAddress(uint256 nft, uint256 index)
    public
    view
    returns (address)
  {
    return tokenBalances[nft].tokens[index];
  }

  // Get token balance for a specific token on this nft
  function getNFTTokenBalance(uint256 nft, address tokenAddress)
    public
    view
    returns (uint256)
  {
    // Need to check ratio because of rebasing tokens like the aave tokens
    uint256 userBalance = tokenBalances[nft].balance[tokenAddress];
    uint256 contractTotal = tokenTotals[tokenAddress];
    uint256 contractBalance = IERC20(tokenAddress).balanceOf(address(this));
    return
      contractTotal > 0 ? (userBalance * contractBalance) / contractTotal : 0;
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

    // Add 1/3 as WMATIC
    _updateBalance(newItemId, address(wmatic), msg.value / 3);
    // Add 1/3 as ETH
    uint256 ethAmount = _swapToEth(msg.value / 3);
    _updateBalance(newItemId, eth, ethAmount);
    // Add 1/3 as Matic in AAVE
    wmatic.approve(address(aavePool), msg.value / 3);
    uint256 awmaticBalance = awmatic.balanceOf(address(this));
    aavePool.deposit(address(wmatic), msg.value / 3, address(this), 0);
    awmaticBalance = awmatic.balanceOf(address(this)) - awmaticBalance;
    _updateBalance(newItemId, address(awmatic), awmaticBalance);
  }

  // Redeem your the token balances from the NFT
  function redeem(uint256 nft) external {
    // Check if nft exists
    require(_exists(nft));
    // Check if you own the token
    require(ownerOf(nft) == msg.sender, 'Not allowed');
    // Iterate over all tokens of the NFT and transfer the balance to NFT owner
    for (uint256 i = 0; i < tokenBalances[nft].tokens.length; i++) {
      _redeemToken(nft, tokenBalances[nft].tokens[i]);
    }
  }

  // Redeem one of the tokens from the NFT
  function redeemToken(uint256 nft, address tokenAddress) external {
    // Check if nft exists
    require(_exists(nft));
    // Check if you own the token
    require(ownerOf(nft) == msg.sender, 'Not allowed');
    _redeemToken(nft, tokenAddress);
  }

  // Helper to redeem a token from an nft
  function _redeemToken(uint256 nft, address tokenAddress) internal {
    // Get the balance of the token and transfer the balance to NFT owner
    uint256 userBalance = tokenBalances[nft].balance[tokenAddress];
    uint256 contractTotal = tokenTotals[tokenAddress];
    uint256 contractBalance = IERC20(tokenAddress).balanceOf(address(this));

    // Dont do division by zero
    uint256 out = getNFTTokenBalance(nft, tokenAddress);
    // Prevent potential rounding issues
    if (out > contractBalance) {
      out = contractBalance;
    }
    if (out > 0) {
      // Prevent potential rounding issues
      if (userBalance > contractTotal) {
        tokenTotals[tokenAddress] = 0;
      } else {
        tokenTotals[tokenAddress] -= userBalance;
      }
      tokenBalances[nft].balance[tokenAddress] = 0;
      IERC20(tokenAddress).transfer(msg.sender, out);
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
    tokenTotals[token] += value;
  }
}
