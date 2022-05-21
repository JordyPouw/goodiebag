import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import classnames from 'classnames';

import './details.css';
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

  return (
    <section className="s-bag-details">
      <ul className="breadcrumbs">
        {crumbs.map((c, index) => (
          <li>
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
        <div className="fancy-box">
          <FancyBox face={face} setFace={setFace} />
        </div>

        <div className="info">
          <h2 className="name">
            {bagUuid ? `Goodiebag #${bagUuid}` : prettyName(bagName)}
          </h2>

          <article className="tokens">
            <div
              className="token"
              onMouseEnter={() => {
                setFace('top');
              }}
              onMouseLeave={resetFace}
            >
              <p>derp 1</p>
            </div>
            <div
              className="token"
              onMouseEnter={() => {
                setFace('bottom');
              }}
              onMouseLeave={resetFace}
            >
              <p>derp 2</p>
            </div>
            <div
              className="token"
              onMouseEnter={() => {
                setFace('back');
              }}
              onMouseLeave={resetFace}
            >
              <p>derp 3</p>
            </div>
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
  const onChange = (e) => {
    console.log(e.target, e.target.value);
    setFace(e.target.value);
  };

  return (
    <>
      <form className="options" onChange={onChange}>
        <input type="radio" value="front" name="face" />
        <input type="radio" value="left" name="face" />
        <input type="radio" value="right" name="face" />
        <input type="radio" value="top" name="face" />
        <input type="radio" value="bottom" name="face" />
        <input type="radio" value="back" name="face" />
      </form>

      <div className="cube-wrapper">
        <div className={classnames({ cube: true, [face]: face })}>
          <div className="cube-face front"></div>
          <div className="cube-face top"></div>
          <div className="cube-face bottom"></div>
          <div className="cube-face left"></div>
          <div className="cube-face right"></div>
          <div className="cube-face back"></div>
        </div>
      </div>
    </>
  );
}
