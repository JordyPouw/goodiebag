import { ethers } from 'ethers';
import { useGoodieBag } from '../hooks/useGoodieBag';
import { useState } from 'react';

export function Mint() {
  const { mint } = useGoodieBag();
  const [value, setValue] = useState();
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
              mint.write({
                overrides: { value: ethers.utils.parseEther(value) },
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
