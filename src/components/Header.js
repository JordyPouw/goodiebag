import React, { useState, useRef, useEffect } from 'react';
import './Header.css';
import styled from 'styled-components';
import logoUrl from '../assets/logo.svg';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ownerAddress } from '../config';

const ConnectButton = styled.a`
    cursor: pointer;
    border: solid black 1px;
    border-radius: 2px;
    padding: 10px 5px;
    flex: 0;
`

const Header = () => {
    return (
        <section className='Header'>
            <div className='container 5 max-w-screen-xl'>
                <div className="logo"><img src={logoUrl} alt="goodibag_logo" /></div>
                <ConnectButton>Connect</ConnectButton>
            </div>
        </section>
    );
};

export default Header;
