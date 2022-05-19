import { useAccount, useConnect, useBalance } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

import './wallet.css';

export function Wallet() {
  const { data: account } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: account?.address,
  });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  if (account) {
    return (
      <div className="s-wallet">
        <div>Connected to {account.address}</div>
        <p>Balance {balance?.formatted} MATIC</p>
      </div>
    );
  }

  return <button onClick={() => connect()}>Connect Wallet</button>;
}
