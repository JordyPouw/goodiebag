import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'wagmi';
import classnames from 'classnames';

import './details.css';
import bagImg from '../../assets/NFT.png';
import AaveImg from '../../assets/cube-aave.webp';
import PolygonImg from '../../assets/cube-polygon.webp';
import UniswapImg from '../../assets/cube-uniswap.png';
import LogoImg from '../../assets/logo_color.png';
import ActiveAccount from '../ActiveAccount';
import { tokens } from '../../tokens';
import { useGoodieBag } from '../../hooks/useGoodieBag';
import { formatNumber, getNFTTokens } from '../../helpers';
import { Mint } from '../Mint';
import { Redeem } from '../Redeem';
import { Transfer } from '../Transfer';
import { RedeemToken } from '../RedeemToken';

export const BagDetails = () => {
  const { bagName, bagUuid } = useParams();
  const { pathname } = useLocation();
  const { contract } = useGoodieBag();
  const nftTokens = useQuery(
    ['goodieBagTokens', bagUuid],
    getNFTTokens.bind(this, contract, bagUuid),
  );
  const tokensData = bagUuid
    ? nftTokens.data.tokens.map((t) => ({
        ...t,
        ...tokens?.[t.address],
      }))
    : [];
  const crumbs = pathname.split('/').filter(Boolean);

  const [face, setFace] = useState('front');

  const resetFace = () => {
    setFace('front');
  };

  const tokensArray = [
    {
      face: 'top',
      name: 'Aave',
      text: 'Aave is an Open Source Protocol to create Non-Custodial Liquidity Markets to earn interest on supplying and borrowing assets with a variable or stable token.',
      sources: [
        { name: 'Introduction', link: 'https://docs.aave.com/faq/' },
        { name: 'Tips', link: 'https://docs.aave.com/' },
        { name: 'Advanced', link: 'https://docs.aave.com/' },
      ],
      data: tokensData.find((t) => t.label === 'AWMATIC'),
    },
    {
      face: 'bottom',
      name: 'Uniswap',
      text: 'Uniswap is an automated liquidity protocol powered by a constant product formula and implemented in a system of non-upgradeable smart contracts on the Ethereum blockchain.',
      sources: [
        {
          name: 'Introduction',
          link: 'https://docs.uniswap.org/protocol/introduction',
        },
        { name: 'Tips', link: 'https://docs.uniswap.org/' },
        { name: 'Advanced', link: 'https://docs.uniswap.org/' },
      ],
      data: tokensData.find((t) => t.label === 'WETH'),
    },
    {
      face: 'back',
      name: 'Polygon',
      text: 'Polygon, also known as the Matic Network, is a scaling solution that aims to provide multiple tools to improve the speed and reduce the cost and complexities of transactions on the blockchain.',
      sources: [
        {
          name: 'Introduction',
          link: 'https://docs.polygon.technology/docs/home/new-to-polygon/',
        },
        { name: 'Tips', link: 'https://docs.polygon.technology/' },
        { name: 'Advanced', link: 'https://docs.polygon.technology/' },
      ],
      data: tokensData.find((t) => t.label === 'WMATIC'),
    },
  ];

  console.log({ tokensArray });

  return (
    <section className="s-bag-details">
      <ul className="breadcrumbs">
        {crumbs.map((c, index) => (
          <li key={index}>
            {index !== crumbs.length - 1 ? (
              <Link to={`/${c}`}>{prettyName(c)}</Link>
            ) : (
              <>
                {bagUuid && index === crumbs.length - 1 && `Goodiebag #`}
                {prettyName(c)}
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="split">
        <div className="fancy-box section-container">
          <FancyBox face={face} setFace={setFace} />
        </div>

        <div className="info">
          <h2 className="name">
            {bagUuid ? `Goodiebag #${bagUuid}` : prettyName(bagName)}
          </h2>
          <p className="description">
            This NFT goodiebag helps you to get started in the world of DeFi on
            Polygon. The WMATIC is already on Aave getting interest and with the
            WETH you can try out swapping on Uniswap.
          </p>

          <article className="tokens">
            {tokensArray.map((token) => (
              <div
                className="token"
                onMouseEnter={() => {
                  setFace(token.face);
                }}
                onMouseLeave={resetFace}
                key={token.name}
              >
                <div className="redeemdadado">
                  {token.data && formatNumber(token.data.balance) > 0 ? (
                    <RedeemToken
                      tokenId={bagUuid}
                      tokenAddress={token.data.address}
                    />
                  ) : !token.data ? null : (
                    <p className="redeemed">Redeemed</p>
                  )}
                </div>

                <h3 className="token-name">
                  {token.name}{' '}
                  {token.data && (
                    <span className="token-balance">
                      {formatNumber(token.data.balance)} {token.data.label} (${' '}
                      {formatNumber(
                        token.data.price.mul(token.data.balance),
                        '26',
                      )}
                      )
                    </span>
                  )}
                </h3>
                <p className="token-introduction">{token.text}</p>
                {bagUuid && (
                  <ul className="token-sources">
                    {token.sources.map((source, i) => (
                      <li key={i}>
                        <a href={source.link} target="_blank">
                          {source.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>
        </div>
      </div>

      {bagUuid ? (
        <div className="action-buttons">
          <Redeem tokenId={bagUuid} />
          <Transfer tokenId={bagUuid} />
        </div>
      ) : (
        <>
          <ActiveAccount>
            <Mint />
          </ActiveAccount>
        </>
      )}
    </section>
  );
};

function prettyName(name) {
  const n = name[0].toUpperCase() + name.substring(1);
  return n.replaceAll('-', ' ');
}

function FancyBox({ face, setFace }) {
  const getFace = (e) => {
    const target = e.target;

    if (target.dataset.face) {
      setFace(target.dataset.face);
    }
  };

  return (
    <>
      <ul className="dots" onMouseOver={getFace}>
        <li className="dots__dot" data-face="front"></li>
        <li className="dots__dot" data-face="left"></li>
        <li className="dots__dot" data-face="right"></li>
        <li className="dots__dot" data-face="top"></li>
        <li className="dots__dot" data-face="bottom"></li>
        <li className="dots__dot" data-face="back"></li>
      </ul>

      <div className="cube-wrapper">
        <div className={classnames({ cube: true, [face]: face })}>
          <div
            className="cube-face front"
            style={{ backgroundImage: `url('${bagImg}')` }}
          ></div>
          <div
            className="cube-face top"
            style={{ backgroundImage: `url('${AaveImg}')` }}
          ></div>
          <div
            className="cube-face bottom"
            style={{ backgroundImage: `url('${UniswapImg}')` }}
          ></div>
          <div
            className="cube-face left"
            style={{ backgroundImage: `url('${LogoImg}')` }}
          ></div>
          <div className="cube-face right"></div>
          <div
            className="cube-face back"
            style={{ backgroundImage: `url('${PolygonImg}')` }}
          ></div>
        </div>
      </div>
    </>
  );
}
