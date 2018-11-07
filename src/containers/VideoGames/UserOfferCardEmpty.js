import React, { Component } from 'react';

// No Props
const UserOfferCardEmpty = (props) => {
    return (
        <div className="user">
            <div className="row valign-wrapper white">
                <div className="col s3">
                    <div className="row"></div>
                    <img src='' alt="" className="hoverable img-circle responsive-img"></img>
                    <div className="row"></div>
                </div>
                
                <div className="col s9">
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>   
                </div>
            </div>
        </div>
    );
};

export default UserOfferCardEmpty;