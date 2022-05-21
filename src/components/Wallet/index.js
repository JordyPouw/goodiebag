import { useAccount, useBalance, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import "./wallet.css";
import { getByLabel } from "../../tokens";
import { formatNumber } from "../../helpers";
import { useTokenBalance } from "../../hooks/useTokenBalance";

export function Wallet() {
  const { data: account } = useAccount();
  const { data: balance } = useBalance({
    addressOrName: account?.address,
  });
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const wmatic = getByLabel('WMATIC');
  const wmaticBalance = useTokenBalance({ addressOrName: wmatic.address });
  const eth = getByLabel('WETH');
  const ethBalance = useTokenBalance({ addressOrName: eth.address });
  if (account) {
    return (
      <div className="s-wallet">
        <div>Connected to {account.address.substring(0, 6)}...</div>
        {balance && <p>Balance {formatNumber(balance.value)} MATIC</p>}
        {wmaticBalance && <p>Balance {formatNumber(wmaticBalance)} WMATIC</p>}
        {ethBalance && <p>Balance {formatNumber(ethBalance)} ETH</p>}
      </div>
    );
  }

  return <button onClick={() => connect()}>Connect Wallet</button>;
}
