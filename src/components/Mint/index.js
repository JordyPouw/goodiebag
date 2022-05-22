import { useCallback, useContext, useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';
import ReactCanvasConfetti from 'react-canvas-confetti';

import './mint.css';
import { useGoodieBag } from '../../hooks/useGoodieBag';
import { TransactionContext } from '../Transactions';

export function useMint() {
  const goodieBag = useGoodieBag();
  const transactionContext = useContext(TransactionContext);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const mint = useCallback(
    (value) => {
      if (value) {
        setBusy(true);
        goodieBag.mint
          .writeAsync({
            overrides: { value: ethers.utils.parseEther(value) },
          })
          .then((data) => {
            data
              .wait()
              .then((data) => {
                transactionContext.addTransaction(data);
                setBusy(false);
                setDone(true);
                setTimeout(() => setDone(false), 6000);
              })
              .catch(() => setBusy(false));
          })
          .catch(() => setBusy(false));
      }
    },
    [goodieBag, setBusy, transactionContext],
  );
  return { mint, busy, done };
}

export function Mint() {
  const [value, setValue] = useState();
  const { mint, busy, done } = useMint();

  return (
    <>
      <SchoolPride done={done} />
      <div className="s-mint">
        <div className="input-wrapper">
          <label className="label">Matic</label>
          <input
            className="input"
            type="number"
            onChange={(e) => setValue(e.currentTarget.value)}
            placeholder={5}
          />
        </div>

        <button className="button" onClick={() => mint(value)} disabled={busy}>
          {busy ? 'Loading..' : 'Mint'}
        </button>
      </div>
    </>
  );
}

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
};

function getAnimationSettings(angle, originX) {
  return {
    particleCount: 3,
    angle,
    spread: 55,
    origin: { x: originX },
    colors: ['#bb0000', '#ffffff'],
  };
}

function SchoolPride({ done }) {
  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(60, 0));
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 16));
    }
  }, [nextTickAnimation, intervalId]);

  const pauseAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
  }, [intervalId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    if (done) {
      startAnimation();
    } else {
      pauseAnimation();
    }
  }, [done, startAnimation, pauseAnimation]);

  return <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />;
}
