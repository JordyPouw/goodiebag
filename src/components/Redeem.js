import { useGoodieBag } from '../hooks/useGoodieBag';

export function Redeem({ tokenId }) {
  const { redeem } = useGoodieBag();
  return (
    <button
      onClick={() => {
        redeem.write({ args: [tokenId] });
      }}
    >
      Redeem
    </button>
  );
}
