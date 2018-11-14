import React, { Component } from 'react';

// CSS styles
import './profile.css';
import 'materialize-css/dist/css/materialize.min.css';

// PROPS
// switchName: 
// firstOption: options in switch
// secondOption: options in switch

const BinarySwitchCustomized = (props) => {
    return(
        <div className="switch" align="center">
            <label>
                {props.firstOption}
         
                <input type="checkbox" id={props.switchName}></input>
                <span className="lever"></span>
          
                {props.secondOption}
            </label>
        </div>
    );
}

export default BinarySwitchCustomized;