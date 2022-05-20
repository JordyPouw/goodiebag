import { useParams } from 'react-router-dom';

import './details.css';
import ActiveAccount from '../ActiveAccount';
import { Mint } from '../Mint';

export const BagDetails = () => {
  const { bagName, bagUuid } = useParams();

  return (
    <section className="s-bag-details">
      {bagUuid ? (
        <p>your bag: {bagUuid}</p>
      ) : (
        <>
          <p>derp: {bagName}</p>
          <ActiveAccount>
            <Mint />
          </ActiveAccount>
        </>
      )}
    </section>
  );
};
