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
    addressOrName: '0x21432F2F86d056D1F4Ee99eC81758042C9588D03',
    contractInterface: GoodieBagABI,
    signerOrProvider: signer.data,
  });
  const totalSupply = useContractRead(
    {
      addressOrName: '0x21432F2F86d056D1F4Ee99eC81758042C9588D03',
      contractInterface: GoodieBagABI,
    },
    'totalSupply',
  );
  const mint = useContractWrite(
    {
      addressOrName: '0x21432F2F86d056D1F4Ee99eC81758042C9588D03',
      contractInterface: GoodieBagABI,
    },
    'mint',
  );
  const redeem = useContractWrite(
    {
      addressOrName: '0x21432F2F86d056D1F4Ee99eC81758042C9588D03',
      contractInterface: GoodieBagABI,
    },
    'redeem',
  );

  const [userTokenIds, setUserTokenIds] = useState([]);
  const [NFTContent, setNFTContent] = useState();
  const [showContents, setShowContents] = useState({});

  useEffect(() => {
    if (contract) {
      getUserTokens(contract, account.address).then(setUserTokenIds);
    }
  }, [contract]);


  if (!totalSupply.isSuccess) {
    return (
      <div>
        <span>We met an unexpected error connecting to blockchain :( <br /> Try again very soon. We are trying our best to solve your prolem.</span>
      </div>
    )
  }

  return (
    <div>

      <div className='mintBtnContainer container'>
        <a
          className='mintBtn'
          onClick={() => {
            const amount = window.prompt('How much matic do you want to use?');
            if (amount) {
              mint.write({
                overrides: { value: ethers.utils.parseEther(amount) },
              });
            }
          }}
        >
          Mint Your Goodiebag
        </a>
      </div>

      <p>Total of <b>{totalSupply.data.toString()}</b> goodiebags are minted</p>
      <br />
      <div>
        Your Goodiebags List:
        <ul className='goodiebagCardList'>
          {userTokenIds.map((token, idx) => {
            return (
              <li className='goodiebagCard'>
                <b className='pb-2'>Goodiebag {token}</b>
                <button
                  onClick={() => {
                    redeem.write({ args: [token] });
                  }}
                >
                  Redeem
                </button>
                <button
                  className='contentsButton pb-2'
                  id={idx}
                  onClick={(e) => {
                    if (!NFTContent) {
                      getNFTTokens(contract, token).then(setNFTContent);
                      setShowContents({ ...showContents, [idx]: true });
                      return;
                    }
                    setShowContents({ ...showContents, [e.target.id]: !showContents[e.target.id] })
                  }}
                >
                  {showContents[idx] ? 'Hide Contents' : 'Show Contents'}
                </button>

                {NFTContent && showContents[idx] && <div style={{ fontSize: '0.8rem', overflowWrap: 'break-word', width: '100%', lineHeight: '1.2em', color: '#585858' }}>{
                  NFTContent.tokens[idx].address
                }: {ethers.utils.formatEther(NFTContent.tokens[idx].balance)}</div>}
              </li>
            )
          })}
        </ul>
      </div>

      {/* {NFTContent && (
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
      )} */}
    </div>
  );
}
