import { useCallback, useContext, useState } from 'react';

import './redeem_token.css';
import { useGoodieBag } from '../../hooks/useGoodieBag';
import { TransactionContext } from '../Transactions';

export function useRedeemToken(tokenId, tokenAddress) {
  const goodieBag = useGoodieBag();
  const transactionContext = useContext(TransactionContext);
  const [busy, setBusy] = useState(false);
  const redeemToken = useCallback(() => {
    setBusy(true);
    goodieBag.redeemToken
      .writeAsync({ args: [tokenId, tokenAddress] })
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
  }, [tokenId, tokenAddress, goodieBag, setBusy, transactionContext]);
  return { redeemToken, busy };
}

export function RedeemToken({ tokenId, tokenAddress }) {
  const { redeemToken, busy } = useRedeemToken(tokenId, tokenAddress);
  return (
    <div className="s-redeem_token">
      {busy ? (
        <p>loading...</p>
      ) : (
        <button
          className="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            redeemToken();
          }}
        >
          Redeem token
        </button>
      )}
    </div>
  );
}
