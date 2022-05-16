import React from 'react';
import GoodieBag from './GoodieBag';
import ActiveAccount from './ActiveAccount';
import './Main.css';


const Main = () => {
    return (
        <section className='Main'>
            <ActiveAccount>
                <GoodieBag />
            </ActiveAccount>
        </section>

    );
};

export default Main;