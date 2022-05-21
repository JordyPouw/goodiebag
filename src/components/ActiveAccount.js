import { useAccount } from 'wagmi';

export default function ActiveAccount({ children, inactiveState }) {
  const { data: account } = useAccount();
  if (account) {
    return children;
  } else {
    return inactiveState ?? null;
  }
}
