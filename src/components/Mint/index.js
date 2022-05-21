import { useCallback, useContext, useState } from 'react';
import { ethers } from 'ethers';

import './mint.css';
import { useGoodieBag } from '../../hooks/useGoodieBag';
import { TransactionContext } from '../Transactions';

export function useMint() {
  const goodieBag = useGoodieBag();
  const transactionContext = useContext(TransactionContext);
  const [busy, setBusy] = useState(false);
  const mint = useCallback(
    (value) => {
      if (value) {
        setBusy(true);
        goodieBag.mint
          .writeAsync({
            overrides: { value: ethers.utils.parseEther(value) },
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
      }
    },
    [goodieBag, setBusy, transactionContext],
  );
  return { mint, busy };
}

export function Mint() {
  const [value, setValue] = useState();
  const { mint, busy } = useMint();

  return (
    <div className="s-mint">
      <div className="input-wrapper">
        <label className="label">Matic</label>
        <input
          className="input"
          type="number"
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder={5}
        />
      </div>

      {busy ? (
        <p>loading...</p>
      ) : (
        <button className="button" onClick={() => mint(value)}>
          Mint
        </button>
      )}
    </div>
  );
}
