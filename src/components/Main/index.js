import { Link } from 'react-router-dom';

import './main.css';
import GoodieBag from '../GoodieBag';
import ActiveAccount from '../ActiveAccount';

export const Main = () => {
  return (
    <section className="s-main">
      <div className="banner"></div>

      <div className="banner2"></div>

      <h2 className="heading">Discover our goodiebags!</h2>

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

      <ActiveAccount>
        <GoodieBag />
      </ActiveAccount>
    </section>
  );
};
