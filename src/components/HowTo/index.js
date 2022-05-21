import React from 'react';
import classNames from "classnames";


import './how_to.css';


export const HowTo = ({ isOpen, handleClick, children }) => {
    return (
        <>
            <div>
                <p className='link-type-text' onClick={() => handleClick()}>{children}</p>
            </div>
            <div className={classNames('how-to-pop-up', { active: isOpen })}>
                <div className="s-close-pop-up" onClick={() => handleClick()}></div>
                <h2 className='how-to-title'>How To</h2>
            </div>
        </>
    );
};

