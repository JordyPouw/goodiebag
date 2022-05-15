export async function getUserTokens(contract, address) {
  const balance = await contract.balanceOf(address);
  const tokens = [];
  for (let i = 0; i < balance.toNumber(); i++) {
    const token = await contract.tokenOfOwnerByIndex(address, i);
    tokens.push(token.toString());
  }
  return tokens;
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
    out.tokens.push({
      address,
      balance,
    });
  }
  return out;
}
