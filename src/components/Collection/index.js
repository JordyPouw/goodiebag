import { Link } from 'react-router-dom';
import { useAccount, useQuery } from 'wagmi';

import './collection.css';
import { getUserTokens } from '../../helpers';
import { useGoodieBag } from '../../hooks/useGoodieBag';
import { Redeem } from '../Redeem';
import { GoodieBagTokens } from '../GoodieBagTokens';
import ActiveAccount from '../ActiveAccount';
import { useTransactionEffect } from '../../hooks/useTransactionCallback';

export const Collection = () => {
  const { data: account } = useAccount();
  const { contract } = useGoodieBag();
  const userGoodieBags = useQuery(
    ['userGoodieBags', account?.address],
    getUserTokens.bind(this, contract, account?.address),
  );
  useTransactionEffect(userGoodieBags.refetch);

  return (
    <section className="s-collection">
      <ActiveAccount inactiveState={<EmptyState />}>
        <h3>You own the following goodiebags:</h3>

        {userGoodieBags.data?.map((token) => (
          <Link className="bag" to={`/my-goodiebags/${token}`}>
            <h2>Goodiebag {token}</h2>
            <GoodieBagTokens tokenId={token} />
            <Redeem tokenId={token} />
          </Link>
        ))}
      </ActiveAccount>
    </section>
  );
};

const EmptyState = () => (
  <>
    <h2>Sup</h2>
    <p>Connect your wallet pls</p>
  </>
);
