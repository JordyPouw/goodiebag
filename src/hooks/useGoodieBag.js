import { useContract, useContractWrite, useProvider, useSigner } from 'wagmi';

const { abi: GoodieBagABI } = require('../contracts/GoodieBag.json');

export function useGoodieBag() {
  const signer = useSigner();
  const provider = useProvider();
  const config = {
    addressOrName: '0x6DC1bEbb8e0881aCa6F082F5F53dD740c2DDF379',
    contractInterface: GoodieBagABI,
  };
  const contract = useContract({
    ...config,
    signerOrProvider: signer.data || provider,
  });
  const mint = useContractWrite(config, 'mint');
  const redeem = useContractWrite(config, 'redeem');
  return { contractConfig: config, mint, redeem, contract };
}
