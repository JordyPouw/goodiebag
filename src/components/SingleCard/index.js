import { Link } from 'react-router-dom';

import './singleCard.css';

export const SingleCard = (props) => {
	return (
		<section className="s-single-card">
			<Link className="bags__bag flip-card" to={`/discover/polygon-bag`}>
				<div className="flip-card-container">
					<div className="flip-card-front">
						<img src={props.frontImg} className="s-polygon-logo" alt="Goodie bag image" />
					</div>
					<div className="flip-card-back">
						<p className="bags__bag-title bold">{props.title}</p>
						<p className="bags__bag-text">{props.text}</p>
					</div>
				</div>
			</Link>
		</section>
	);
};
