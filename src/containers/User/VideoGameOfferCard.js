import React, { Component } from 'react';

import {Link} from 'react-router-dom'
// USEROFFERCARD
// Props {
//   id
//   userImageUrl
//   personName
//   price
// }
const VideoGameOfferCard = (props) => {
	return (
		<div className="user">
			<div className="row valign-wrapper white z-depth-1">
				<div className="col s3">
					<div className="row"></div>
					<Link to={
						{
							pathname: "/videogames",
							state:{
								initialPos: props.videoGameId
							}
						}
					}><img src={props.imageUrl} className="hoverable responsive-img"></img></Link>
					<div className="row"></div>
				</div>
																
				<div className="col s9">
					<div className="row"></div>
					<font color="blue">{props.title}</font>
					<br></br>
					<font color="red">${props.price}</font>
					<div className="row"></div>
					
				</div>
			</div>
		</div>
	);
};

export default VideoGameOfferCard;
