import './sidebar.css';
import logoUrl from '../../assets/logo.svg';
import Profile from '../Profile';

export const Sidebar = () => {
  return (
    <section className="s-sidebar">
      <div className="container">
        <div className="logo">
          <img src={logoUrl} alt="goodibag_logo" />
        </div>
        <Profile></Profile>
      </div>
    </section>
  );
};
