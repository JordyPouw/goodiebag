import { useAccount, useConnect, useBalance } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import styled from 'styled-components';

export default function Profile() {
  const { data: account } = useAccount();
  // const { data: balance } = useBalance({
  //   addressOrName: account?.address,
  // });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });


  if (account) {
    return (
      <div className='text-right'>
        <div>Connected to <p className='walletadrs'>{account.address.substring(0, 4) + '...' + account.address.substring(account.address.length - 5)}</p></div>
      </div>
    );
  }

  return <a onClick={() => connect()} className="button button--telesto"><span><span><i>Connect</i>&nbsp;&nbsp;👛</span></span></a >;
}
