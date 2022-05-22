import { Link } from 'react-router-dom';
import { useAccount, useQuery } from 'wagmi';

import './collection.css';
import polygonBagSvg from '../../assets/polygon.svg'
import { getUserTokens } from '../../helpers';
import { useGoodieBag } from '../../hooks/useGoodieBag';
import { GoodieBagTokens } from '../GoodieBagTokens';
import ActiveAccount from '../ActiveAccount';
import { SingleCard } from '../SingleCard';
import { useTransactionEffect } from '../../hooks/useTransactionCallback';

export const Collection = () => {
  const { data: account } = useAccount();
  const { contract } = useGoodieBag();
  const userGoodieBags = useQuery(
    ['userGoodieBags', account?.address],
    getUserTokens.bind(this, contract, account?.address),
  );
  useTransactionEffect(userGoodieBags.refetch);


  if(userGoodieBags.data && userGoodieBags.data.length > 0){

    return (
      <section className="s-collection has-collection">
        <ActiveAccount inactiveState={<EmptyState />}>
          <div className="bags">
            {userGoodieBags.data?.map((token) => (
              <div className='section-container minted-bag-container'>
                <Link className="bag" to={`/my-goodiebags/${token}`}>
                  <GoodieBagTokens tokenId={token} />
                </Link>
              </div>
            ))}
          </div>
        </ActiveAccount>
      </section>
    );

  }else{

    return (
      <section className="s-collection">
        <div className='no-collection section-container'>
          <div className="banner"></div>
          <h2 className="heading">You do not own any Goodiebags :(</h2>
          <h3 className="heading sub-heading">Get some below</h3>

          <div className="bags">
            <SingleCard cardKey="1" frontImg={polygonBagSvg} title="Polygon 10" text="Some stats and description of the NFT"/>
            <SingleCard cardKey="2" frontImg={polygonBagSvg} title="Polygon 20" text="Some stats and description of the NFT"/>
            <SingleCard cardKey="3" frontImg={polygonBagSvg} title="Polygon 30" text="Some stats and description of the NFT"/>
          </div>
          
        </div>  
      </section>
    );

  }
};

const EmptyState = () => (
  <>
    <h2>Sup</h2>
    <p>Connect your wallet pls</p>
  </>
);
