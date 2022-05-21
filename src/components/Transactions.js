import { createContext, useCallback, useState } from 'react';

export const TransactionContext = createContext({});
export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const addTransaction = useCallback(
    (transaction) => {
      setTransactions([...transactions, transaction]);
    },
    [setTransactions, transactions],
  );

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}
