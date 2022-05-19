import { Link } from 'react-router-dom';

import './sidebar.css';
import logoUrl from '../../assets/logo.svg';
import { Wallet } from '../Wallet';

export const Sidebar = () => {
  return (
    <section className="s-sidebar">
      <div className="logo">
        <img src={logoUrl} alt="goodibag_logo" />
      </div>

      <ul>
        <li>
          <Link to="discover">Discover</Link>
        </li>
        <li>
          <Link to="my-goodiebags">My goodiebags</Link>
        </li>
        <li>
          <Link to="how-to">How to</Link>
        </li>
      </ul>

      <Wallet />
    </section>
  );
};
