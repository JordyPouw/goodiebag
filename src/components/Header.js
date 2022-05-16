import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import styled from 'styled-components';
import logoUrl from '../assets/logo.svg';
import { useAccount, useConnect, useBalance, chain, createClient, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
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
