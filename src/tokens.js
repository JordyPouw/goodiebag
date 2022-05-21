export const tokens = {
  '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270': {
    label: 'WMATIC',
    priceFeed: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0',
  },
  '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619': {
    label: 'WETH',
    priceFeed: '0xF9680D99D6C9589e2a93a78A04A279e509205945',
  },
  '0x6d80113e533a2C0fe82EaBD35f1875DcEA89Ea97': {
    label: 'AWMATIC',
    priceFeed: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0',
  }
};

export function getByLabel(label) {
  return Object.keys(tokens)
    .map(
      (key) => label === tokens[key].label && { ...tokens[key], address: key },
    )
    .find(Boolean);
}
