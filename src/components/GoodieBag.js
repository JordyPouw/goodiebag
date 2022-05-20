import { useContractRead } from 'wagmi';

import { Mint } from './Mint';
import { useGoodieBag } from '../hooks/useGoodieBag';

export default function GoodieBag() {
  const { contractConfig } = useGoodieBag();
  const totalSupply = useContractRead(contractConfig, 'totalSupply');

  return (
    <div>
      <p>Total of {totalSupply.data?.toString()} goodiebags are minted</p>

      <hr />

      <Mint />
    </div>
  );
}
