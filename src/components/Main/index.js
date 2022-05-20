import React from 'react';

import './main.css';
import GoodieBag from '../GoodieBag';
import ActiveAccount from '../ActiveAccount';

export const Main = () => {
  return (
    <section className="s-main">
      <ActiveAccount>
        <GoodieBag />
      </ActiveAccount>
    </section>
  );
};
