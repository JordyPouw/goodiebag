import { useAccount, useConnect, useBalance } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function Profile() {
  const { data: account } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: account?.address,
  });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  if (account) {
    return (
      <div>
        <div>Connected to {account.address}</div>
        <p>Balance {balance?.formatted} MATIC</p>
      </div>
    );
  }

  return <button onClick={() => connect()}>Connect Wallet</button>;
}
