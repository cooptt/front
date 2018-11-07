import React, { Component } from 'react';

// USEROFFERCARD
// Props {
//   id
//   userImageUrl
//   personName
//   price
// }
const UserOfferCard = (props) => {
	return (
		<div className="user">
			<div className="row valign-wrapper white hoverable z-depth-1">
				<div className="col s3">
					<div className="row"></div>
					<img src={props.userImageUrl} alt="" className="hoverable img-circle responsive-img"></img>
					<div className="row"></div>
				</div>
																
				<div className="col s9">
					<font color="blue">{props.personName}</font>
					<br></br>
					<font color="black">{props.email}</font>   
					<font color="red">${props.price}</font>
					<br></br>
				</div>
			</div>
		</div>
	);
};

export default UserOfferCard;
