import { useAccount, useContractRead } from 'wagmi';
import { useTransactionEffect } from './useTransactionCallback';

const minABI = [
  // balanceOf
  {
    constant: true,

    inputs: [{ name: '_owner', type: 'address' }],

    name: 'balanceOf',

    outputs: [{ name: 'balance', type: 'uint256' }],

    type: 'function',
  },
];

export function useTokenBalance({ addressOrName }) {
  const { data: account } = useAccount();
  const balance = useContractRead(
    {
      addressOrName,
      contractInterface: minABI,
    },
    'balanceOf',
    { args: [account?.address] },
  );
  useTransactionEffect(balance.refetch);
  return balance.data;
}
