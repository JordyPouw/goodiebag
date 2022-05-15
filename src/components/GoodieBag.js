import {
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
  useSigner,
} from 'wagmi';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { getNFTTokens, getUserTokens } from '../helpers';

const { abi: GoodieBagABI } = require('../contracts/GoodieBag.json');

export default function GoodieBag() {
  const { data: account } = useAccount();
  const signer = useSigner();
  const contract = useContract({
    addressOrName: '0x6DC1bEbb8e0881aCa6F082F5F53dD740c2DDF379',
    contractInterface: GoodieBagABI,
    signerOrProvider: signer.data,
  });
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
  const redeem = useContractWrite(
    {
      addressOrName: '0x6DC1bEbb8e0881aCa6F082F5F53dD740c2DDF379',
      contractInterface: GoodieBagABI,
    },
    'redeem',
  );

  const [userTokenIds, setUserTokenIds] = useState([]);
  const [NFTContent, setNFTContent] = useState();
  useEffect(() => {
    if (contract) {
      getUserTokens(contract, account.address).then(setUserTokenIds);
    }
  }, [contract]);

  if (!totalSupply.isSuccess) {
    return null;
  }

  return (
    <div>
      <p>Total of {totalSupply.data.toString()} goodiebags are minted</p>
      <div>
        You own the following goodiebags:
        <ul>
          {userTokenIds.map((token) => (
            <li>
              Goodiebag {token}
              <button
                onClick={() => {
                  redeem.write({ args: [token] });
                }}
              >
                Redeem
              </button>
              <button
                onClick={() => {
                  getNFTTokens(contract, token).then(setNFTContent);
                }}
              >
                Show contents
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={() => {
          const amount = window.prompt('How much matic do you want to use?');
          if (amount) {
            mint.write({
              overrides: { value: ethers.utils.parseEther(amount) },
            });
          }
        }}
      >
        Mint new goodiebag
      </button>
      {NFTContent && (
        <div>
          <p>Token id: {NFTContent.tokenId}</p>
          <ul>
            {NFTContent.tokens.map(({ address, balance }) => (
              <li>
                {address}: {ethers.utils.formatEther(balance)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
