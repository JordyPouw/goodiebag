import './sidebar.css';
import logoUrl from '../../assets/logo.svg';
import { Wallet } from '../Wallet';

export const Sidebar = () => {
  return (
    <section className="s-sidebar">
      <div className="logo">
        <img src={logoUrl} alt="goodibag_logo" />
      </div>

      <Wallet />
    </section>
  );
};
