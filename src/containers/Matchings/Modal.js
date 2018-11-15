import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import './Modalm.css'
// CSS styles

// External Components  

import Cycle from './Cycle';

// Server URL
import config from '../../config'


// PROPS
// modalName: this is a name for the modal for setting the id
// modalContent: an JSX Element with the content(could be other components)
class Modal extends Component{

    constructor(props){
        super(props);
    }

    componentDidMount() {

    }

    render() {

        return(
            <div id={this.props.modalName} className="modal modalm">
                <div className="modal-content">
                    {this.props.modalContent}
                </div>
                {/* <div className="modal-footer">
                    <a className="modal-close waves-effect waves-green btn-flat">close</a>
                </div> */}
            </div>
        );
    }
}


export default Modal;
