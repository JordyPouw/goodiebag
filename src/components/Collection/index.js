import { Link } from 'react-router-dom';
import { useAccount, useQuery } from 'wagmi';

import './collection.css';
import maticSvg from '../../assets/polygon-matic-logo.svg'
import { getUserTokens } from '../../helpers';
import { useGoodieBag } from '../../hooks/useGoodieBag';
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


  if(userGoodieBags.data.length > 0){

    return (
      <section className="s-collection">
        <ActiveAccount inactiveState={<EmptyState />}>
          <div className="bags">
            {userGoodieBags.data?.map((token) => (
              <Link className="bag" to={`/my-goodiebags/${token}`}>
                <h2>Goodiebag {token}</h2>
                <GoodieBagTokens tokenId={token} />
              </Link>
            ))}
          </div>
        </ActiveAccount>
      </section>
    );

  }else{

    return (
      <section className="s-collection">
        <div className="banner"></div>
        <div className='no-collection'>
          <h2 className="heading">You do not own any Goodiebags :(</h2>
          <h3 className="heading sub-heading">Get some below</h3>

          <div className="bags">

            <Link className="bags__bag flip-card" to={`/discover/polygon-bag`}>
              <div className='flip-card-container'>
                <div className='flip-card-front'>
                  <img src={maticSvg} className="s-polygon-logo" alt="polygon logo" />
                  <h2>Polygon 10</h2>
                </div>
                <div className="flip-card-back">
                  <p className="bags__bag-title">Polygon goodiebag</p>
                </div>
              </div>
            </Link>
            <Link className="bags__bag flip-card" to={`/discover/polygon-bag`}>
              <div className='flip-card-container'>
                <div className='flip-card-front'>
                  <img src={maticSvg} className="s-polygon-logo" alt="polygon logo" />
                  <h2>Polygon 20</h2>
                </div>
                <div className="flip-card-back">
                  <p className="bags__bag-title">Polygon goodiebag</p>
                </div>
              </div>
            </Link>
            <Link className="bags__bag flip-card" to={`/discover/polygon-bag`}>
              <div className='flip-card-container'>
                <div className='flip-card-front'>
                  <img src={maticSvg} className="s-polygon-logo" alt="polygon logo" />
                  <h2>Polygon 30</h2>
                </div>
                <div className="flip-card-back">
                  <p className="bags__bag-title">Polygon goodiebag</p>
                </div>
              </div>
            </Link>

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
