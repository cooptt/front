import React, { Component } from 'react';
import './profile.css';

import 'materialize-css/dist/css/materialize.min.css'
import {Link} from 'react-router-dom'

// Server URL
import config from '../../config'

class OfferCard extends Component {

    constructor(props) {
        super(props);
    }
    

    deleteOfferAux = _ => {
        this.props.deleteOffer(this.props.offer.offerId);
    }

    render() {
        return (
            <div>
                <div className="card hoverable">
                    <Link to={
                            {
                                pathname: "/videogames",
                                state:{
                                    initialPos: this.props.offer.videoGameId
                                }
                            }
                    }>    
                    <img className="activator" src={config.server + '/' + this.props.offer.image} width="200" height="230"></img>
                    </Link>

                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">
                            <font size="3"> {this.props.offer.title.substring(0, 15)} </font>
                            <i className="material-icons right tiny">
                                more_vert
                            </i>
                        </span>
                    
                        <div align="right">
                            <font color="#cca300">
                                ${this.props.offer.price}
                            </font>
                            {(this.props.flagCanDelete === true) ?
                            <p align='right'>
                                <i className="material-icons hoverable" onClick = {this.deleteOfferAux}>delete</i>
                            </p> : null}
                        </div>
                    </div>
        
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">
                            Description
                            <i className="material-icons right">
                                close
                            </i>
                        </span>
                        <p>Juego en buen estado, 1 mes de uso, incluye caja!</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default OfferCard;