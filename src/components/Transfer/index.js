import { useCallback, useContext, useState } from 'react';

import './transfer.css';
import { useGoodieBag } from '../../hooks/useGoodieBag';
import { TransactionContext } from '../Transactions';
import { useAccount } from 'wagmi';

export function useTransfer() {
  const { data: account } = useAccount();
  const goodieBag = useGoodieBag();
  const transactionContext = useContext(TransactionContext);
  const [busy, setBusy] = useState(false);
  const transfer = useCallback(
    (tokenId, to) => {
      setBusy(true);
      goodieBag.transferFrom
        .writeAsync({
          args: [account?.address, to, tokenId],
        })
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
    },
    [goodieBag, setBusy, transactionContext],
  );
  return { transfer, busy };
}
export function Transfer({ tokenId }) {
  const { transfer, busy } = useTransfer();
  return (
    <div className="s-transfer">
      {busy ? (
        <p>loading...</p>
      ) : (
        <button
          className="button"
          onClick={() => {
            var address = prompt('Transfer to wallet address');
            if (address) {
              transfer(tokenId, address);
            }
          }}
        >
          Transfer
        </button>
      )}
    </div>
  );
}
