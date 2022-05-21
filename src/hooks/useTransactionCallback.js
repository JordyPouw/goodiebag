import { TransactionContext } from '../components/Transactions';
import { useContext, useEffect } from 'react';

export function useTransactionEffect(callback) {
  const transactionContext = useContext(TransactionContext);
  useEffect(() => {
    if (transactionContext.transactions.length > 0) {
      callback(transactionContext.transactions);
    }
  }, [callback, transactionContext.transactions]);
}
