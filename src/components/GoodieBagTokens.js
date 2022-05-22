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
        <div className='bag-description-top'>
          <h2>Goodiebag {tokenId}</h2>
          <div className='bag-table-head'>
            <h3>Contents</h3>
            <h3>Redeem</h3>
          </div>
        </div>
        <div className='bag-description-bottom'>
          {nftTokens.data.tokens.map(({ address, balance, price }) => (
            <p className='token-balance'>
              <div className='token'>
                <p className='token-name bold'>{tokens?.[address].label || address}:</p> 
                <p className='balance'>{formatNumber(balance)} ($ {formatNumber(price.mul(balance), '26')})</p>
              </div>
              {formatNumber(balance) > 0 ? 
                <RedeemToken tokenId={tokenId} tokenAddress={address}/> : 
                <p className='redeemed'>Redeemed</p>}
            </p>
          ))}
          <p className='total-value'><span className="bold token-name">Total:</span> {formatNumber(totalUSD, '26')} (USD)</p>
        </div>
      </div>
    )
  );
}
