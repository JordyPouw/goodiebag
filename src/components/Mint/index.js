import { useCallback, useContext, useState } from 'react';
import { ethers } from 'ethers';

import './mint.css';
import { useGoodieBag } from '../../hooks/useGoodieBag';
import { TransactionContext } from '../Transactions';

export function useMint() {
  const goodieBag = useGoodieBag();
  const transactionContext = useContext(TransactionContext);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

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
                setDone(true);
                setTimeout(() => setDone(false), 1000);
              })
              .catch(() => setBusy(false));
          })
          .catch(() => setBusy(false));
      }
    },
    [goodieBag, setBusy, transactionContext],
  );
  return { mint, busy, done };
}

export function Mint() {
  const [value, setValue] = useState();
  const { mint, busy, done } = useMint();

  console.log({ done });

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

      <button className="button" onClick={() => mint(value)} disabled={busy}>
        {busy ? 'Loading..' : 'Mint'}
      </button>
    </div>
  );
}
