import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'

//AUTOCOMPLETE COMPONENT
// props = {
//   name: 'name of the autocomplete field id=name',
//   autoCompleteData: 'object name - url'
// };
class AutocompleteInput extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.handleAutoCompleteInputClick = this.handleAutoCompleteInputClick.bind(this);
    }
  
    handleAutoCompleteInputClick() {
      
      let videoGameName = document.getElementById(this.props.name).value;
      let videoGameId = this.props.nombreId.get(videoGameName);
  
      console.log('VideoGameName:' + videoGameName);
      console.log('VideoGameId:' + videoGameId);

      this.props.updateImagePos(videoGameId);

      document.getElementById(this.props.name).value = '';
    }

    componentDidMount() {
      let elem = document.getElementById(this.props.name);
      this.instanceAutocomplete = M.Autocomplete.init(elem, {
        data: this.props.autoCompleteData,
        onAutocomplete: this.handleAutoCompleteInputClick
        // limit: 4
      });

      // console.log(this.autoCompleteData);
    }
  
    render() {
      return(
        <div className={this.props.divStyle}>
          <div className="input-field">
            <i className="material-icons prefix tiny">search</i>
            <input type="text" id={this.props.name} className="autocomplete"></input>
            <label htmlFor={this.props.name}>VideoGame</label>
          </div>
        </div>
      );}
  }


  export default AutocompleteInput;