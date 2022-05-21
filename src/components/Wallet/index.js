import { useAccount, useConnect, useBalance } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import maticSvg from '../../assets/polygon-matic-logo.svg'
import './wallet.css';
import { useState } from 'react';
import classNames from "classnames";

export function Wallet(props) {

  // const [walletModal, setWalletModal] = useState(props.isOpen)
  const { data: account } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: account?.address,
  });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });


  if (account) {
    return (
      <div className={classNames('s-wallet-pop-up',{
        active: props.isOpen     
      })}>

        <div className="s-close-pop-up" onClick={() => props.handleClick()}></div>
        <div className='s-wallet-address'><span className='bold'>Wallet address:</span> {account.address}</div>

        <div className='s-matic-balance'>
          <span className='bold'>Balance: </span> 
          
          <div className='s-matic-balance-amt'>
            {balance?.formatted} MATIC
            <img src={maticSvg} className="s-polygon-logo" alt="polygon logo" />
          </div>
        </div>

      </div>
    );
  }

  return <button onClick={() => connect()}>Connect Wallet</button>;
}
