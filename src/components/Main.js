import React from 'react';
import GoodieBag from './GoodieBag';
import ActiveAccount from './ActiveAccount';
import './Main.css';


const Main = () => {
    return (
        <section className='Main'>
            <div className='container max-w-screen-xl'>
                <ActiveAccount>
                    <GoodieBag />
                </ActiveAccount>
            </div>
        </section>

    );
};

export default Main;