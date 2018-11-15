import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import config from '../../config'

import './VideoGames.css'

// USEROFFERCARD
// Props {
//   id
//   userImageUrl
//   personName
//   price
// }
const UserOfferCard = (props) => {
	let linkToUserProfile = `/userprofile/${props.userId}`;
	return (
		<div className="user-in-video-game">
			<div className="row valign-wrapper white z-depth-1">
				<div className="col s3">
					
					<Link to={linkToUserProfile}>
						<img src={props.userImageUrl} className="hoverable img-circle responsive-img"></img>
					</Link>

				</div>										
				<div className="col s9">
					<div className="data">
						<center>
							<p className="userNameUserCard">{props.personName}</p>
							<p className="userEmailUserCard">{props.email}</p> 
							<p className="priceUserCard">${props.price}</p>
							<br></br>
						</center>
					</div>		
				</div>
			</div>
		</div>
	);
};

export default UserOfferCard;
