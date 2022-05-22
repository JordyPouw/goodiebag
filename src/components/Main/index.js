import { Link } from 'react-router-dom';
import { useContractRead } from 'wagmi';

import './main.css';
import { useGoodieBag } from '../../hooks/useGoodieBag';
import { SingleCard } from '../SingleCard';
import { useTransactionEffect } from '../../hooks/useTransactionCallback';

import polygonBagSvg from '../../assets/polygon.svg'


export const Main = () => {
  const { contractConfig } = useGoodieBag();
  const totalSupply = useContractRead(contractConfig, 'totalSupply');
  useTransactionEffect(totalSupply.refetch);

  return (
    <section className="s-main">
        <div className="banner">
          <h1 className='banner-title neonText'>NFT GOODIE BAG</h1>
        </div>
      <div className='section-container'>
        <h2 className="heading">Discover our goodiebags!</h2>
        <h3 className="heading sub-heading">
          A total of {totalSupply.data?.toString() > 0 ? totalSupply.data?.toString() : 0} goodiebags are currently
          minted.
        </h3>
        <div className="bags">
          <SingleCard cardKey="1" frontImg={polygonBagSvg} title="Polygon 10" text="Some stats and description of the NFT"/>
          <SingleCard cardKey="2" frontImg={polygonBagSvg} title="Polygon 20" text="Some stats and description of the NFT"/>
          <SingleCard cardKey="3" frontImg={polygonBagSvg} title="Polygon 30" text="Some stats and description of the NFT"/>
        </div>
      </div>
      
    </section>
  );
};
