import React, { Component } from 'react';
import './profile.css';

// Make it a Function Component
// PROPS
// icon
// inputFieldName
// initialText

const InputFieldCustomized = (props) => {
    return(
        <div>
            <div className="input-field col s4">
                <i className="material-icons prefix">{props.icon}</i>
                <input id={props.inputFieldName} type="text"></input>
                <label htmlFor={props.inputFieldName}>{props.initialText}</label>
            </div>
        </div>
    );
}

export default InputFieldCustomized;