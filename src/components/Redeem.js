import { useGoodieBag } from '../hooks/useGoodieBag';
import { TransactionContext } from './Transactions';
import { useCallback, useContext, useState } from 'react';

export function useRedeem(tokenId) {
  const goodieBag = useGoodieBag();
  const transactionContext = useContext(TransactionContext);
  const [busy, setBusy] = useState(false);
  const redeem = useCallback(
    (value) => {
      if (value) {
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
      }
    },
    [goodieBag, setBusy, transactionContext],
  );
  return { redeem, busy };
}

export function Redeem({ tokenId }) {
  const { redeem, busy } = useRedeem(tokenId);
  return (
    <div>
      {busy ? <p>loading...</p> : <button onClick={redeem}>Redeem</button>}
    </div>
  );
}
