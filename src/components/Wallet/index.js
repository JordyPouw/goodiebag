import { useAccount, useBalance, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import maticSvg from '../../assets/polygon-matic-logo.svg'
import './wallet.css';
import { useState } from 'react';
import classNames from "classnames";
import { getByLabel } from '../../tokens';
import { formatNumber } from '../../helpers';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { useTransactionEffect } from '../../hooks/useTransactionCallback';

function WalletDetails({ account, ...props }) {
  const { refetch, data: balance } = useBalance({
    addressOrName: account?.address,
  });
  const wmatic = getByLabel('WMATIC');
  const eth = getByLabel('WETH');
  const awmatic = getByLabel('AWMATIC');
  const wmaticBalance = useTokenBalance({ addressOrName: wmatic.address });
  const ethBalance = useTokenBalance({ addressOrName: eth.address });
  const awmaticBalance = useTokenBalance({
    addressOrName: awmatic.address,
  });
  useTransactionEffect(refetch);
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
        {wmaticBalance && <p>{formatNumber(wmaticBalance)} Wrapped Matic</p>}
        {ethBalance && <p>{formatNumber(ethBalance)} Wrapped ETH</p>}
        {awmaticBalance && <p>{formatNumber(awmaticBalance)} Matic in Aave</p>}
      </div>

    </div>
  );
}

export function Wallet(props) {
  const { data: account } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });


  if (account) {
    return <WalletDetails {...props} account={account} />;
  }
  return <button onClick={() => connect()}>Connect Wallet</button>;
}
