import React from 'react';
import classNames from "classnames";
import Connect from '../../assets/blockchain.svg';
import Discover from '../../assets/astronaut.svg';
import Claim from '../../assets/sale.svg';
import Learn from '../../assets/brain.svg';

import './how_to.css';


export const HowTo = ({ isOpen, handleClick, children }) => {

    const howtoboxes = [
        { title: 'Connect', img: Connect, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut tristique sapien. Phasellus vel augue suscipit, dapibus mi sed, mattis sapien. Pellentesque convallis velit ex, ullamcorper eleifend est ornare eu. Donec at ligula vitae dolor egestas fringilla in eget dui. Donec in est magna.' },
        { title: 'Discover', img: Discover, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut tristique sapien. Phasellus vel augue suscipit, dapibus mi sed, mattis sapien. Pellentesque convallis velit ex, ullamcorper eleifend est ornare eu. Donec at ligula vitae dolor egestas fringilla in eget dui. Donec in est magna.' },
        { title: 'Claim', img: Claim, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut tristique sapien. Phasellus vel augue suscipit, dapibus mi sed, mattis sapien. Pellentesque convallis velit ex, ullamcorper eleifend est ornare eu. Donec at ligula vitae dolor egestas fringilla in eget dui. Donec in est magna.' },
        { title: 'Learn', img: Learn, desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut tristique sapien. Phasellus vel augue suscipit, dapibus mi sed, mattis sapien. Pellentesque convallis velit ex, ullamcorper eleifend est ornare eu. Donec at ligula vitae dolor egestas fringilla in eget dui. Donec in est magna.' },
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
                        howtoboxes.map((box, i) => (
                            <div className='how-to-box' key={i} style={{ backgroundImage: `url(${box.img})` }}>
                                <h3 style={{ paddingBottom: '5px' }}>{box.title}</h3>
                                <p className='how-to-box-desc'>{box.desc}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
};
