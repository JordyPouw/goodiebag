import React from 'react';
import { providers } from 'ethers';
import { Provider, createClient } from 'wagmi';

import { Sidebar } from './components/Sidebar';
import Main from './components/Main';

const client = createClient({
  provider(config) {
    return new providers.JsonRpcProvider('http://127.0.0.1:8545/', 31337);
  },
});

export const App = () => {
  return (
    <Provider client={client}>
      <Sidebar />
      <Main />
    </Provider>
  );
};
