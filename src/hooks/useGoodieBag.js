import { useContract, useContractWrite, useProvider, useSigner } from 'wagmi';

const { abi: GoodieBagABI } = require('../contracts/GoodieBag.json');

export function useGoodieBag() {
  const signer = useSigner();
  const provider = useProvider();
  const config = {
    addressOrName: '0x06fAddefDE8Dd5d4C6FAACe68b400754d960cb75',
    contractInterface: GoodieBagABI,
  };
  const contract = useContract({
    ...config,
    signerOrProvider: signer.data || provider,
  });
  const mint = useContractWrite(config, 'mint');
  const redeem = useContractWrite(config, 'redeem');
  const redeemToken = useContractWrite(config, 'redeemToken');
  const transferFrom = useContractWrite(config, 'transferFrom');
  return {
    contractConfig: config,
    mint,
    redeem,
    redeemToken,
    contract,
    transferFrom,
  };
}
