import { useContractRead } from 'wagmi';

import { Mint } from './Mint';
import { useGoodieBag } from '../hooks/useGoodieBag';
import { useTransactionEffect } from '../hooks/useTransactionCallback';

export default function GoodieBag() {
  const { contractConfig } = useGoodieBag();
  const totalSupply = useContractRead(contractConfig, 'totalSupply');
  useTransactionEffect(totalSupply.refetch);

  return (
    <div>
      <p>Total of {totalSupply.data?.toString()} goodiebags are minted</p>
      <hr />
      <Mint />
    </div>
  );
}
