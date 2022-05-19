import './Header.css';
import logoUrl from '../assets/logo.svg';
import Profile from './Profile';


const Header = () => {
    return (
        <section className='Header'>
            <div className='container max-w-screen-xl'>
                <div className="logo"><img src={logoUrl} alt="goodibag_logo" /></div>
                <Profile></Profile>
            </div>
        </section>
    );
};

export default Header;
