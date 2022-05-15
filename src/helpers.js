export async function getUserTokens(contract, address) {
  const balance = await contract.balanceOf(address);
  const tokens = [];
  for (let i = 0; i < balance.toNumber(); i++) {
    const token = await contract.tokenOfOwnerByIndex(address, i);
    tokens.push(token.toString());
  }
  return tokens;
}
