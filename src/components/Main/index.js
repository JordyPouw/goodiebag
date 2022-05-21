import { Link } from 'react-router-dom';
import { useContractRead } from 'wagmi';

import './main.css';
import { useGoodieBag } from '../../hooks/useGoodieBag';
import { useTransactionEffect } from '../../hooks/useTransactionCallback';

export const Main = () => {
  const { contractConfig } = useGoodieBag();
  const totalSupply = useContractRead(contractConfig, 'totalSupply');
  useTransactionEffect(totalSupply.refetch);

  return (
    <section className="s-main">
      <div className="banner">
        <h1 className='banner-title neonText'>NFT GOODIE BAG</h1>
      </div>

      <h2 className="heading">Discover our goodiebags!</h2>
      <p className="subheading">
        A total of {totalSupply.data?.toString()} goodiebags are currently
        minted.
      </p>

      <div className="bags">
        <Link className="bags__bag" to={`/discover/polygon-bag`}>
          <p className="bags__bag-title">Polygon goodiebag</p>
        </Link>
        <Link className="bags__bag" to={`/discover/polygon-bag`}>
          <p className="bags__bag-title">Polygon goodiebag</p>
        </Link>
        <Link className="bags__bag" to={`/discover/polygon-bag`}>
          <p className="bags__bag-title">Polygon goodiebag</p>
        </Link>
      </div>
    </section>
  );
};
