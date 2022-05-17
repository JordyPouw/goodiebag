import { tokens } from '../tokens';
import { ethers } from 'ethers';
import { useQuery } from 'wagmi';
import { getNFTTokens } from '../helpers';
import { useGoodieBag } from '../hooks/useGoodieBag';

export function GoodieBagTokens({ tokenId }) {
  const { contract } = useGoodieBag();
  const nftTokens = useQuery(
    ['goodieBagTokens', tokenId],
    getNFTTokens.bind(this, contract, tokenId),
  );
  return (
    nftTokens.data && (
      <div>
        <h3>Contents</h3>
        {nftTokens.data.tokens.map(({ address, balance }) => (
          <p>
            {tokens?.[address].label || address}:{' '}
            {ethers.utils.formatEther(balance)}
          </p>
        ))}
      </div>
    )
  );
}
