import { tokens } from './tokens';
import { Contract, ethers } from 'ethers';

export async function getUserTokens(contract, address) {
  const balance = await contract.balanceOf(address);
  const tokens = [];
  for (let i = 0; i < balance.toNumber(); i++) {
    const token = await contract.tokenOfOwnerByIndex(address, i);
    tokens.push(token.toString());
  }
  return tokens;
}

const aggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { internalType: 'uint80', name: 'roundId', type: 'uint80' },
      { internalType: 'int256', name: 'answer', type: 'int256' },
      { internalType: 'uint256', name: 'startedAt', type: 'uint256' },
      { internalType: 'uint256', name: 'updatedAt', type: 'uint256' },
      { internalType: 'uint80', name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export async function getChainLinkPrice(provider, address) {
  const contract = new Contract(address, aggregatorV3InterfaceABI, provider);
  const round = await contract.latestRoundData();
  return round[1];
}

export async function getNFTTokens(contract, tokenId) {
  const count = await contract.getNFTTokenCount(tokenId);
  const out = {
    tokenId,
    tokens: [],
  };
  for (let i = 0; i < count; i++) {
    const address = await contract.getNFTTokenAddress(tokenId, i);
    const balance = await contract.getNFTTokenBalance(tokenId, address);
    const price = await getChainLinkPrice(
      contract.provider,
      tokens?.[address]?.priceFeed,
    );
    out.tokens.push({
      address,
      balance,
      price,
    });
  }
  return out;
}

export function formatNumber(bigNumber, decimals = 18, precision = 3) {
  return parseFloat(ethers.utils.formatUnits(bigNumber, decimals)).toFixed(
    precision,
  );
}
