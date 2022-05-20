import { tokens } from '../tokens';
import { ethers } from 'ethers';
import { formatNumber, getNFTTokens } from '../helpers';
import { useGoodieBag } from '../hooks/useGoodieBag';
import { useQuery } from 'wagmi';

export function GoodieBagTokens({ tokenId }) {
  const { contract } = useGoodieBag();
  const nftTokens = useQuery(
    ['goodieBagTokens', tokenId],
    getNFTTokens.bind(this, contract, tokenId),
  );
  const totalUSD = nftTokens.data.tokens.reduce(
    (memo, { address, balance, price }) => memo.add(balance.mul(price)),
    ethers.utils.parseEther('0'),
  );
  return (
    nftTokens.data && (
      <div>
        <h3>Contents</h3>
        {nftTokens.data.tokens.map(({ address, balance, price }) => (
          <p>
            {tokens?.[address].label || address}: {formatNumber(balance)} ($
            {formatNumber(price.mul(balance), '26')})
          </p>
        ))}
        <hr />
        <p>Total USD value: {formatNumber(totalUSD, '26')}</p>
      </div>
    )
  );
}
