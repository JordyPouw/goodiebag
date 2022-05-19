import { useAccount } from 'wagmi';

export default function ActiveAccount({ children }) {
  const { data: account } = useAccount();
  if (account) {
    return children;
  } else {
    return null;
  }
}
