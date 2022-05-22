import { useAccount, useBalance, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import maticSvg from '../../assets/polygon-matic-logo.svg'
import ethSvg from '../../assets/ethereum-eth-logo.svg';
import './wallet.css';
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
    <div className={classNames('s-wallet-pop-up', {
      active: props.isOpen
    })}>

      <div className="s-close-pop-up" onClick={() => props.handleClick()}></div>
      <div className='s-wallet-address'><span className='bold'>Wallet address:</span> {account.address}</div>

      <div className='s-balance'>
        <span className='bold'>Balance: </span>

        <div className='s-balance-amt'>
          <img src={maticSvg} className="s-polygon-logo" alt="polygon logo" />
          {balance?.formatted} MATIC
        </div>
        <div className='s-balance-amt'>
          <img src={maticSvg} className="s-polygon-logo" alt="polygon logo" />
          {wmaticBalance && <p>{formatNumber(wmaticBalance)} Wrapped Matic</p>}
        </div>
        <div className='s-balance-amt'>
          <img src={ethSvg} className="s-polygon-logo" alt="polygon logo" />
          {ethBalance && <p>{formatNumber(ethBalance)} Wrapped ETH</p>}
        </div>
        <div className='s-balance-amt'>
          <img src={maticSvg} className="s-polygon-logo" alt="polygon logo" />
          {awmaticBalance && <p>{formatNumber(awmaticBalance)} Matic in Aave</p>}
        </div>
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
