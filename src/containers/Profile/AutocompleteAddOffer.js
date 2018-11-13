import React, { Component } from 'react';
import './profile.css';

import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'

//AUTOCOMPLETE COMPONENT
// props = {
//   name: 'name of the autocomplete field id=name',
//   autoCompleteData: 'object name - url'
// };
class AutocompleteAddOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
  
    componentDidMount() {
        let elem = document.querySelector('#' + this.props.name);
        this.instanceAutocomplete = M.Autocomplete.init(elem, { data: this.props.autoCompleteData });
    }
  
    render() {
        return(
            <div className={this.props.divStyle}>
                <div className="input-field">
                    <i className="material-icons prefix tiny">search</i>
                    <input type="text" id={this.props.name} className="autocomplete"></input>
                    <label for={this.props.name}>VideoGame</label>
                </div>
            </div>
        );
    }
}

export default AutocompleteAddOffer;