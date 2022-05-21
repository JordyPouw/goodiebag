import { useContract, useContractWrite, useProvider, useSigner } from 'wagmi';
import { contractAddress } from '../config';

const { abi: GoodieBagABI } = require('../contracts/GoodieBag.json');

export function useGoodieBag() {
  const signer = useSigner();
  const provider = useProvider();
  const config = {
    addressOrName: process.env.REACT_APP_CONTRACT || contractAddress,
    contractInterface: GoodieBagABI,
  };
  console.log(process.env.REACT_APP_CONTRACT)
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
