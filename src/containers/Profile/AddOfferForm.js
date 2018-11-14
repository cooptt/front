import React, { Component } from 'react';

// CSS styles
import './profile.css';
import 'materialize-css/dist/css/materialize.min.css';

// External Components
import AutocompleteAddOffer from './AutocompleteAddOffer'; // autoCompleteInputName = "videoGames-input"
import InputFieldCustomized from './InputFieldCustomized'; // inputFieldName = "price-field" -> price Input
import BinarySwitchCustomized from './BinarySwitchCustomized'; // switchName = "offerType" -> switch purchase/sale

import config from '../../config';

class AddOfferForm extends Component {
    constructor(props) {
        super(props);

        this.catalogue = [];
        this.nombreId = new Map();
        this.autoCompleteData = {};
    }

    componentDidMount() {
        fetch(`${config.server}/getCatalogue`)
        .then(response =>  response.json())
        .then(response => {
            this.catalogue = response.data;
            console.log(this.catalogue);
            for(let i = 0; i < this.catalogue.length ; i++){
                this.nombreId.set(this.catalogue[i].title, this.catalogue[i].videoGameId);
                // console.log(this.catalogue[i].title + '------->' + this.catalogue[i].videoGameId);
                this.autoCompleteData[this.catalogue[i].title] = config.server + '/' +this.catalogue[i].image;
            }
            console.log(this.autoCompleteData);
    
            // let elem = document.querySelector('.sidenav');
            // this.sideNav = M.Sidenav.init(elem, {});
        })
        .catch(err => console.error(err));
    }

    handleClickOnCreateOffer = _ => {
        console.log('AQUIIII');
        console.log(this.nombreId);
    
        let videoGameName = document.querySelector('#videoGames-input').value;
        let price = document.querySelector('#price-field').value;
    
        let videoGameId = this.nombreId.get(videoGameName);
    
        console.log('VideoGameName:' + videoGameName);
        console.log('price:' + price);
    
        // CHECK
        let userId = this.props.userId;
    
        let typeInUrl = (document.querySelector('#offerType').checked) ? 'Sell' : 'Buy';
        
		let requestUrl = `${config.server}/add${typeInUrl}Offer?userId=${userId}&videoGameId=${videoGameId}&price=${price}`;
        
        
        fetch(requestUrl , {method: 'POST'})
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    
        // addSellOffer?userId=0&videoGameId=0&price=500
        // addBuyOffer?userId=0&videoGameId=1&price=600
    }


    render() {
        return(
            <div>
                <h3>Agregar Oferta</h3>
                
                <br></br><br></br>
                
                <AutocompleteAddOffer autoCompleteInputName="videoGames-input" autoCompleteData={this.autoCompleteData}/>
                
                <br></br><br></br>
                
                <InputFieldCustomized inputFieldName="price-field" icon="monetization_on" initialText="Precio de la oferta"/>

                <br></br><br></br>

                <BinarySwitchCustomized switchName="offerType" firstOption="Oferta de compra" secondOption="Oferta de venta"/>

                <br></br><br></br><br></br>
                <p align="right">
                    <a className="modal-close waves-effect waves-blue btn-flat blue"  onClick = {this.handleClickOnCreateOffer}>
                        <font color="white">Añadir Oferta</font>
                    </a>
                </p>
            </div>
        );
    }
}

export default AddOfferForm;