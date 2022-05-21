import React from 'react';
import classNames from "classnames";


import './how_to.css';


export const HowTo = ({ isOpen, handleClick, children }) => {

    const howtoboxes = [
        { title: 'Connect' },
        { title: 'Discover' },
        { title: 'Claim' },
        { title: 'Learn' },
    ]

    return (
        <>
            <div>
                <p className='link-type-text' onClick={() => handleClick()}>{children}</p>
            </div>
            <div className={classNames('how-to-pop-up', { active: isOpen })}>
                <div className="s-close-pop-up" onClick={() => handleClick()}></div>
                <h2 className='how-to-title'>How To</h2>
                <div className='how-to-boxes'>
                    {
                        howtoboxes.map(box => (
                            <div className='how-to-box'>
                                <h3>{box.title}</h3>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

