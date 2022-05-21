import { useAccount, useBalance, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import './wallet.css';
import { getByLabel } from '../../tokens';
import { formatNumber } from '../../helpers';
import { useTokenBalance } from '../../hooks/useTokenBalance';
import { useTransactionEffect } from '../../hooks/useTransactionCallback';

export function Wallet() {
  const { data: account } = useAccount();
  const { refetch, data: balance } = useBalance({
    addressOrName: account?.address,
  });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
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
  if (account) {
    return (
      <div className="s-wallet">
        <div>Connected to {account.address.substring(0, 6)}...</div>
        <p>In wallet:</p>
        {balance && <p>{formatNumber(balance.value)} Matic</p>}
        {wmaticBalance && <p>{formatNumber(wmaticBalance)} Wrapped Matic</p>}
        {ethBalance && <p>{formatNumber(ethBalance)} Wrapped ETH</p>}
        {awmaticBalance && <p>{formatNumber(awmaticBalance)} Matic in Aave</p>}
      </div>
    );
  }

  return <button onClick={() => connect()}>Connect Wallet</button>;
}
