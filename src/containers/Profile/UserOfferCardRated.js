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
    let linkToUserProfile = `/userprofile/${props.userId}`;
	return (
        <div className="row">
            <div className="user">
                <div className="row valign-wrapper white z-depth-1">
                    <div className="col s3">
                        
                        <Link to={linkToUserProfile}>
                            <img src={config.server + '/' + props.userImage} className="hoverable img-circle responsive-img"></img>
                        </Link>

                    </div>										
                    <div className="col s9">
                        <div className="data">
                            <center>
                                <p className="userNameUserCard">{props.personName}</p>
                                <p className="userEmailUserCard">{props.email}</p> 
                                {props.type===1 ?
                                    <p className="priceUserCard">{props.matches} Matching{props.matches>1?'s':null}</p>
                                : <p className="priceUserCard">${props.matches}</p>
                                }
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
