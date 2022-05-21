import { tokens } from '../tokens';
import { ethers } from 'ethers';
import { formatNumber, getNFTTokens } from '../helpers';
import { useGoodieBag } from '../hooks/useGoodieBag';
import { useQuery } from 'wagmi';
import { useTransactionEffect } from '../hooks/useTransactionCallback';
import { RedeemToken } from './RedeemToken';

export function GoodieBagTokens({ tokenId }) {
  const { contract } = useGoodieBag();
  const nftTokens = useQuery(
    ['goodieBagTokens', tokenId],
    getNFTTokens.bind(this, contract, tokenId),
  );
  useTransactionEffect(nftTokens.refetch);
  const totalUSD = nftTokens.data?.tokens.reduce(
    (memo, { balance, price }) => memo.add(balance.mul(price)),
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
            <RedeemToken tokenId={tokenId} tokenAddress={address} />
          </p>
        ))}
        <p>Total USD value: {formatNumber(totalUSD, '26')}</p>
      </div>
    )
  );
}
