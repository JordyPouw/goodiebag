import { Link } from 'react-router-dom';
import ActiveAccount from '../ActiveAccount';

import './sidebar.css';
import logoUrl from '../../assets/logo.svg';
import { Wallet } from '../Wallet';
import { HowTo } from '../HowTo';
import { useState, useCallback } from 'react';

export const Sidebar = () => {
	const [walletModal, setWalletModal] = useState(false);
	const [howtoModal, setHowToModal] = useState(false);

	const handleWalletClick = useCallback(
		() => {
			setWalletModal(!walletModal);
		},
		[walletModal]
	);

	const handleHowToClick = useCallback(
		() => {
			setHowToModal(!howtoModal);
		},
		[howtoModal]
	);

	return (
		<section className="s-sidebar">
			<div className="logo">
				<img src={logoUrl} alt="goodibag_logo" />
			</div>

			<ul>
				<li>
					<Link to="discover">Discover</Link>
				</li>
				<li>
					<Link to="my-goodiebags">My goodiebags</Link>
				</li>
				<li>
					{/* <Link to="how-to">How to</Link> */}
					<HowTo isOpen={howtoModal} handleClick={handleHowToClick}>HowTo</HowTo>
				</li>
			</ul>

			<div className="s-bottom">
				<ActiveAccount inactiveState={null}>
					<button onClick={() => handleWalletClick()}>My Wallet</button>
				</ActiveAccount>
				<p className="bold">Powered by Polygon</p>
			</div>
			<Wallet isOpen={walletModal} handleClick={handleWalletClick} />
		</section>
	);
};
