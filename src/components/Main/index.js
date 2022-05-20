import React from 'react';

import './main.css';
import GoodieBag from '../GoodieBag';
import ActiveAccount from '../ActiveAccount';
import { TransactionProvider } from '../Transactions';

export const Main = () => {
  return (
    <section className="s-main">
      <ActiveAccount>
        <TransactionProvider>
          <GoodieBag />
        </TransactionProvider>
      </ActiveAccount>
    </section>
  );
};
