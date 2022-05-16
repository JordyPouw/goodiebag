import React from 'react';
import Header from './components/Header';
import Profile from './components/Profile';
import { Provider, createClient } from 'wagmi';
import { providers } from 'ethers';
import Main from './components/Main';

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
      {/* <div>
        <Profile />
      </div> */}
      <Main />
    </Provider>
  );
};

export default App;
