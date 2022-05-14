//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

interface IWETH9 is IERC20 {
    /// @notice Deposit ether to get wrapped ether
    function deposit() external payable;

    /// @notice Withdraw wrapped ether to get ether
    function withdraw(uint256) external;
}

contract GoodieBag is ERC721 {
    IWETH9 wmatic = IWETH9(0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270);
    uint256 counter = 0;

    constructor() ERC721("GoodieBag", "GBag") {}

    struct TokenBalance {
        address[] tokens;
        mapping(address => uint256) balance;
    }

    mapping(uint256 => TokenBalance) tokenBalances;

    function getGoodieTokenCount(uint256 goodieBag)
        public
        view
        returns (uint256)
    {
        return tokenBalances[goodieBag].tokens.length;
    }

    function getGoodieTokenAddress(uint256 goodieBag, uint256 index)
        public
        view
        returns (address)
    {
        return tokenBalances[goodieBag].tokens[index];
    }

    function getGoodieTokenBalance(uint256 goodieBag, address tokenAddress)
        public
        view
        returns (uint256)
    {
        return tokenBalances[goodieBag].balance[tokenAddress];
    }

    function mint() external payable {
        wmatic.deposit{value: msg.value}();
        _safeMint(msg.sender, counter);
        counter++;
        TokenBalance storage tokenBalance = tokenBalances[0];
        tokenBalance.tokens.push(address(wmatic));
        tokenBalance.balance[address(wmatic)] += msg.value;
    }

    function redeem(uint256 token) external {
        require(ownerOf(token) == msg.sender, "Not allowed");
        TokenBalance storage tokenBalance = tokenBalances[token];
        for (uint256 i = 0; i < tokenBalance.tokens.length; i++) {
            address tokenAddress = tokenBalance.tokens[i];
            uint256 balance = tokenBalance.balance[tokenAddress];
            if (balance > 0) {
                tokenBalance.balance[tokenAddress] = 0;
                IERC20(tokenAddress).transfer(msg.sender, balance);
            }
        }
    }
}
