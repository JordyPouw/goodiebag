import React from 'react';
import Header from './components/Header';
import Profile from './components/Profile';
import { Provider, createClient } from 'wagmi';
import GoodieBag from './components/GoodieBag';
import { providers } from 'ethers';

const client = createClient({
  provider(config) {
    return new providers.JsonRpcProvider('http://127.0.0.1:8545/', 31337);
  },
});

const App = () => {
  return (
    <Provider client={client}>
      <div>
        <Header></Header>
      </div>
      <div>
        <Profile />
      </div>
      <div>
        <GoodieBag />
      </div>
    </Provider>
  );
};

export default App;
