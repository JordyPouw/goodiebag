import { Link, useLocation, useParams } from 'react-router-dom';

import './details.css';
import ActiveAccount from '../ActiveAccount';
import { Mint } from '../Mint';
import { Redeem } from '../Redeem';

export const BagDetails = () => {
  const { bagName, bagUuid } = useParams();
  const { pathname } = useLocation();
  const crumbs = pathname.split('/').filter(Boolean);

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
          {/* here comes the fancy goodiebag box with animation stuff? */}
        </div>

        <div className="info">
          <h2 className="name">
            {bagUuid ? `Goodiebag #${bagUuid}` : prettyName(bagName)}
          </h2>

          <article className="tokens">
            <div className="token">
              <p>derp 1</p>
            </div>
            <div className="token">
              <p>derp 2</p>
            </div>
            <div className="token">
              <p>derp 3</p>
            </div>
          </article>
        </div>
      </div>

      {bagUuid ? (
        <>
          <Redeem tokenId={bagUuid} />
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
