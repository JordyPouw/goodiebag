import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classnames from 'classnames';

import './details.css';
import bagImg from '../../assets/NFT.png';
import AaveImg from '../../assets/cube-aave.webp';
import PolygonImg from '../../assets/cube-polygon.webp';
import UniswapImg from '../../assets/cube-uniswap.png';
import LogoImg from '../../assets/logo_color.png';
import ActiveAccount from '../ActiveAccount';
import { Mint } from '../Mint';
import { Redeem } from '../Redeem';
import { Transfer } from '../Transfer';

export const BagDetails = () => {
  const { bagName, bagUuid } = useParams();
  const { pathname } = useLocation();
  const crumbs = pathname.split('/').filter(Boolean);

  const [face, setFace] = useState('front');

  const resetFace = () => {
    setFace('front');
  };

  const tokens = [
    {
      face: 'top',
      name: 'Aave',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit architecto.',
      sources: [
        { name: 'source 1', link: 'https://google.com' },
        { name: 'source 2', link: 'https://google.com' },
        { name: 'source 3', link: 'https://google.com' },
      ],
    },
    {
      face: 'bottom',
      name: 'Uniswap',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit architecto.',
      sources: [
        { name: 'source 1', link: 'https://google.com' },
        { name: 'source 2', link: 'https://google.com' },
        { name: 'source 3', link: 'https://google.com' },
      ],
    },
    {
      face: 'back',
      name: 'Polygon',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit architecto.',
      sources: [
        { name: 'source 1', link: 'https://google.com' },
        { name: 'source 2', link: 'https://google.com' },
        { name: 'source 3', link: 'https://google.com' },
      ],
    },
  ];

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
            Lorem ipsum dolor sit amet consectetur adipisicing elit odit
            dolores.
          </p>

          <article className="tokens">
            {tokens.map((token) => (
              <div
                className="token"
                onMouseEnter={() => {
                  setFace(token.face);
                }}
                onMouseLeave={resetFace}
                key={token.name}
              >
                <h3 className="token-name">{token.name}</h3>
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
        <>
          <Redeem tokenId={bagUuid} />
          <Transfer tokenId={bagUuid} />
        </>
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
