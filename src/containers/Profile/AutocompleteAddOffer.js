import React, { Component } from 'react';
import './profile.css';

import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';


//AUTOCOMPLETE COMPONENT
// props = {
//   autoCompleteInputName: 'name of the autocomplete field id=name',
//   autoCompleteData: 'object name - url'
//   divStyle:
// };

class AutocompleteAddOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
  
    handleAutoCompleteInputClick = _ => {
        let videoGameName = document.getElementById(this.props.autoCompleteInputName).value;
        this.props.changeSateOnAddForm(videoGameName);
    }

    componentDidMount() {
        let elem = document.querySelector('#' + this.props.autoCompleteInputName);
        this.instanceAutocomplete = M.Autocomplete.init(elem, { data: this.props.autoCompleteData , limit: 5, onAutocomplete: this.handleAutoCompleteInputClick });
    }
  

    render() {
        return(
            <div className={this.props.divStyle}>
                <div className="input-field">
                    <i className="material-icons prefix tiny">search</i>
                    <input type="text" id={this.props.autoCompleteInputName} className="autocomplete"></input>
                    <label htmlFor={this.props.autoCompleteInputName}>Nombre del videojuego</label>
                </div>
            </div>
        );
    }
}

export default AutocompleteAddOffer;