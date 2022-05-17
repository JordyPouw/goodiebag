import { useAccount, useContractRead, useQuery } from 'wagmi';
import { getUserTokens } from '../helpers';
import { Mint } from './Mint';
import { useGoodieBag } from '../hooks/useGoodieBag';
import { Redeem } from './Redeem';
import { GoodieBagTokens } from './GoodieBagTokens';

export default function GoodieBag() {
  const { data: account } = useAccount();
  const { contract, contractConfig } = useGoodieBag();
  const totalSupply = useContractRead(contractConfig, 'totalSupply');
  const userGoodieBags = useQuery(
    ['userGoodieBags', account.address],
    getUserTokens.bind(this, contract, account.address),
  );

  return (
    <div>
      <p>Total of {totalSupply.data?.toString()} goodiebags are minted</p>
      <hr />
      <Mint />
      <hr />
      <div>
        <h3>You own the following goodiebags:</h3>
        {userGoodieBags.data?.map((token) => (
          <div>
            <h2>Goodiebag {token}</h2>
            <GoodieBagTokens tokenId={token} />
            <Redeem tokenId={token} />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
