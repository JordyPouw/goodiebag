import { useAccount, useConnect, useProvider, useContractRead } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function Profile() {
  const { data: account } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  if (account) return <div>Connected to {account.address}</div>;
  return <button onClick={() => connect()}>Connect Wallet</button>;
}
