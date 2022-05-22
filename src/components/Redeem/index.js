import { useCallback, useContext, useState } from 'react';

import './redeem.css';
import { useGoodieBag } from '../../hooks/useGoodieBag';
import { TransactionContext } from '../Transactions';

export function useRedeem(tokenId) {
  const goodieBag = useGoodieBag();
  const transactionContext = useContext(TransactionContext);
  const [busy, setBusy] = useState(false);
  const redeem = useCallback(() => {
    setBusy(true);
    goodieBag.redeem
      .writeAsync({ args: [tokenId] })
      .then((data) => {
        data
          .wait()
          .then((data) => {
            transactionContext.addTransaction(data);
            setBusy(false);
          })
          .catch(() => setBusy(false));
      })
      .catch(() => setBusy(false));
  }, [tokenId, goodieBag, setBusy, transactionContext]);
  return { redeem, busy };
}

export function Redeem({ tokenId }) {
  const { redeem, busy } = useRedeem(tokenId);

  return (
    <div className="s-redeem">
      <button className="button" onClick={redeem} disabled={busy}>
        {busy ? 'Loading..' : 'Redeem'}
      </button>
    </div>
  );
}
