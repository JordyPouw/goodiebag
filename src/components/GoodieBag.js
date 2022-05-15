import { useAccount, useContractRead, useContractWrite } from 'wagmi';
import { ethers } from 'ethers';
const { abi: GoodieBagABI } = require('../contracts/GoodieBag.json');

export default function GoodieBag() {
  const { data: account } = useAccount();
  const totalSupply = useContractRead(
    {
      addressOrName: '0x6DC1bEbb8e0881aCa6F082F5F53dD740c2DDF379',
      contractInterface: GoodieBagABI,
    },
    'totalSupply',
  );
  const mint = useContractWrite(
    {
      addressOrName: '0x6DC1bEbb8e0881aCa6F082F5F53dD740c2DDF379',
      contractInterface: GoodieBagABI,
    },
    'mint',
  );
  if (!account) {
    return null;
  }

  return (
    <div>
      <p>Total of {totalSupply.data.toString()} goodiebags are minted</p>
      <button
        onClick={() =>
          mint.write({ overrides: { value: ethers.utils.parseEther('1') } })
        }
      >
        Mint
      </button>
    </div>
  );
}
