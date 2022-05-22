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
			<Link to="discover" className="logo">
				<img src={logoUrl} alt="goodibag_logo" />
			</Link>
			<ul>
				<li>
					<Link to="discover">Discover</Link>
				</li>
				<ActiveAccount inactiveState={null}>
					<li>
						<Link to="my-goodiebags">My goodiebags</Link>
					</li>
				</ActiveAccount>

				<li>
					{/* <Link to="how-to">How to</Link> */}
					<HowTo isOpen={howtoModal} handleClick={handleHowToClick}>How to</HowTo>
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
