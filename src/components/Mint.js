import { ethers } from 'ethers';
import { useGoodieBag } from '../hooks/useGoodieBag';
import { useContext, useState } from 'react';
import { TransactionContext } from './Transactions';

export function Mint() {
  const { mint } = useGoodieBag();
  const [value, setValue] = useState();
  const transactionContext = useContext(TransactionContext);

  return (
    <div>
      <h3>Create new goodiebag</h3>
      Amount of matic{' '}
      <input
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder={5}
      />
      <div>
        <button
          onClick={() => {
            if (value) {
              mint
                .writeAsync({
                  overrides: { value: ethers.utils.parseEther(value) },
                })
                .then((data) => {
                  data.wait().then((data) => {
                    transactionContext.addTransaction(data);
                  });
                });
            }
          }}
        >
          Mint
        </button>
      </div>
    </div>
  );
}
