import React from 'react';
import { providers } from 'ethers';
import { Provider, createClient } from 'wagmi';

import './app.css';
import { Sidebar } from '../Sidebar';
import { RootRoutes as Routes } from '../../Routes';

const client = createClient({
  autoConnect: true,
  provider(config) {
    return new providers.JsonRpcProvider('http://127.0.0.1:8545/', 31337);
  },
});

export const App = () => {
  return (
    <Provider client={client}>
      <div className="s-app">
        <Sidebar />
        <Routes />
      </div>
    </Provider>
  );
};
