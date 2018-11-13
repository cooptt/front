import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import config from '../../config'
import './profile.css'

// USEROFFERCARD
// Props {
//   userId
//   userImageUrl
//   personName
//   matches
//   email
// }
const UserOfferCardRated = (props) => {
	let linkToUserProfile = `/users/profile/${props.userId}`;
	return (
        <div className="row">
            <div className="user">
                <div className="row valign-wrapper white z-depth-1">
                    <div className="col s3">
                        
                        <Link to={linkToUserProfile}>
                            <img src={'https://melbournechapter.net/images/female-vector-avatar-5.png'} className="hoverable img-circle responsive-img"></img>
                        </Link>

                    </div>										
                    <div className="col s9">
                        <div className="data">
                            <center>
                                <p className="userNameUserCard">{props.personName}</p>
                                <p className="userEmailUserCard">{props.email}</p> 
                                <p className="priceUserCard">{props.matches} Matching{props.matches>1?'s':null}</p>
                                <br></br>
                            </center>
                        </div>		
                    </div>
                </div>
            </div>
        </div>
	);
};

export default UserOfferCardRated;
