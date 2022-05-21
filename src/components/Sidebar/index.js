import { Link } from 'react-router-dom';

import './sidebar.css';
import logoUrl from '../../assets/logo.svg';
import { Wallet } from '../Wallet';
import { useState, useCallback } from 'react';

export const Sidebar = () => {
	const [ walletModal, setWalletModal ] = useState(false);

	const handleClick = useCallback(
		() => {
			setWalletModal(!walletModal);
		},
		[ walletModal ]
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
					<Link to="how-to">How to</Link>
				</li>
			</ul>

			<div className="s-bottom">
				<button onClick={() => handleClick()}>My Wallet</button>
				<p className="bold">Powered by Polygon</p>
			</div>
			<Wallet isOpen={walletModal} handleClick={handleClick} />
		</section>
	);
};
