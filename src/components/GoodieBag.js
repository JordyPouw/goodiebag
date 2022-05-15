import { useContractRead } from 'wagmi';
const { abi: GoodieBagABI } = require('../contracts/GoodieBag.json');

export default function GoodieBag() {
  const contract = useContractRead(
    {
      addressOrName: '0x6dc1bebb8e0881aca6f082f5f53dd740c2ddf379',
      contractInterface: GoodieBagABI,
    },
    'totalSupply'
  );
  console.log(contract.data);
  return <div></div>;
}
