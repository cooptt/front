import React, { Component } from 'react';

import M from 'materialize-css/dist/js/materialize.min.js'


// External Components
import Header from '../../components/Header/Header';
import Paypal from '../../components/Paypal/Paypal';
import SideNavChat from '../VideoGames/SideNavChat';
import BestRankings from './BestRankings';

import UserInfoAndRating from './UserInfoAndRating';
import Modal from '../Tripletas/Modal';
import SaleAndPurchaseOffers from './SaleAndPurchaseOffers';
import AddOfferForm from './AddOfferForm';

import Footer from '../../components/Footer/Footer';


import {Redirect } from 'react-router-dom';


// CSS styles
import './profile.css';
import 'materialize-css/dist/css/materialize.min.css'

// Server URL
import config from '../../config'
import OfferCard from './OfferCard';

class Profile extends Component {
	constructor(props) {
		super(props);
		//this.handleClick = this.handleClick.bind(this);

		this.saleOffers = [];
		this.purchaseOffers = [];

		this.state = {
			currentOfferList: [], 
			offersType: 'Ofertas de venta', 
			componentInModal: <div></div>, 
			destId: null,
			isPremium: 0,
			numOfSaleOffers: 0,
			numOfPurchaseOffers: 0,
			stay:  this.props.userId !== null && parseInt(this.props.userId) === parseInt(this.props.match.params.userId)
		};

		this.deleteOffer = this.deleteOffer.bind(this);

		this.addOfferForm = <AddOfferForm userId={this.props.userId}/>;

		this.bestRankings = <center><BestRankings userId={this.props.userId}/></center>;
	}

  	componentDidMount() {
		let elem= document.querySelector('.fixed-action-btn');
		this.optionButton = M.FloatingActionButton.init(elem, {hoverEnabled: false});

		let actionsModalelem = document.getElementById('modal-for-actions');
		this.modalInstance = M.Modal.init(actionsModalelem, {onCloseEnd: this.handleCloseActionModal});

		let sideNavElem = document.querySelector('.sidenav');
		this.sideNav = M.Sidenav.init(sideNavElem, {});
		  
		
		this.getSaleOffers();
		this.getPurchaseOffers();

		this.getUserProperties();
	}

	getUserProperties = _ => {
        fetch(`${config.server}/getUserProperties?userId=${this.props.userId}`)
        .then(response => response.json())
        .then(response => {
            this.setState({isPremium: response.data.expiration});
        })
        .catch(err => console.error(err));
    }
	
	getSaleOffers = _ => {
        fetch(`${config.server}/getUserSellList?userId=${this.props.userId}`)
        .then(response => response.json())
        .then(response => {
			this.saleOffers = response.data;
			if(this.state.offersType === 'Ofertas de venta')
				this.setState({currentOfferList: response.data});
			
			this.setState({numOfSaleOffers: this.saleOffers.length});
        })
        .catch(err => console.error(err));
    }
    
    getPurchaseOffers = _ => {
        fetch(`${config.server}/getUserBuyList?userId=${this.props.userId}`)
        .then(response => response.json())
        .then(response =>{
			this.purchaseOffers = response.data;
			if(this.state.offersType === 'Ofertas de compra')
				 this.setState({currentOfferList: response.data});
			
		    this.setState({numOfPurchaseOffers: this.purchaseOffers.length});
		 } )
        .catch(err => console.error(err));
    }

	handleCloseActionModal = _ => {
		this.getSaleOffers();
		this.getPurchaseOffers();
	}
  
  	handleOpenChat = _ => {
    	this.sideNav.open();
	}

	sendMessagePersonalHandler = _ =>{
		let value = this.props.match.params.userId
		this.setState({destId:value})
	}

	handleClickOnBestOffers = _ => {
		this.setState({componentInModal: this.bestRankings});
		this.modalInstance.open();
	}

	handleClickOnAddOffer = _ => {
		this.setState({componentInModal: this.addOfferForm});
		this.modalInstance.open();
	}

	handleClickOnChangeOfferType = _ => {
		if(this.state.offersType === 'Ofertas de compra'){
			this.setState({currentOfferList: this.saleOffers, offersType: 'Ofertas de venta'});
		}else if(this.state.offersType === 'Ofertas de venta'){
			this.setState({currentOfferList: this.purchaseOffers, offersType: 'Ofertas de compra'});
		}
	}

	updateDestId = (newDestId) => {
		this.setState({destId: newDestId});
	}

	deleteOffer(offerId) {
		console.log('ESTA OFERTA SE VA A BORRAR',offerId)
		fetch(`${config.server}/deleteOffer?offerId=${offerId}`,{method: 'POST'})
        .then(response => response.json())
        .then(response =>{
			console.log(response);
			
			this.getSaleOffers();
			this.getPurchaseOffers();
		 } )
		.catch(err => console.error(err));
	} 

	changeStatusToPremium() {

	}

	render() {
		let destUserId = parseInt(this.props.match.params.userId);

		if(this.state.stay === false)
			return <Redirect to='/'/>;

    	return (
      		<div>
				<Header 
					authenticated={this.props.authenticated} 
					login={this.props.logInHandler} 
					logout={this.props.logOutHandler} 
					userId={this.props.userId}
				/>
				
				<Modal modalName="modal-for-actions" modalContent={this.state.componentInModal}/>
				
				<br></br><br></br><br></br>

				<UserInfoAndRating userId={this.props.userId} destUserId={destUserId}/>
				
				{(this.props.userId === parseInt(this.props.match.params.userId) && this.state.isPremium <= 0) ?
					<div className="button-premium">
						<Paypal userId={this.props.userId} getUserProperties={this.getUserProperties.bind(this)}/>
					</div> : null
				}
				
				{(this.props.userId === parseInt(this.props.match.params.userId) && this.state.isPremium > 0) ?
					<img src={config.server + '/' + 'Fotos/premium.jpg'} className="imagePremium"></img>
					:null
				}

				<br></br><br></br><br></br>

				<p className="type-offer-title-profile">
					{this.state.offersType} &nbsp;
					<a className="btn-floating red">
						<i className="material-icons" onClick = {this.handleClickOnChangeOfferType}>	
							forward
						</i>
					</a>
				</p>

				<br></br><br></br><br></br>
				
				<div className="center-offers-table">
					<SaleAndPurchaseOffers flagCanDelete = {true} offerList={this.state.currentOfferList} deleteOffer={this.deleteOffer}/>
				</div>


				{(this.props.userId!==null)?
					<SideNavChat userId={this.props.userId} destId={parseInt(this.state.destId)}/>:null}

				
				<Footer/>

				{(this.props.userId!==null)?
					<div className="fixed-action-btn">
						<a className="btn-floating btn-large blue darken-4 pulse">
							<i className="large material-icons">menu</i>
						</a>
						
						<ul>
							<li>
								<a className="btn-floating yellow darken-2">
									<i className="material-icons" onClick = {this.handleClickOnBestOffers}>
										local_offer
									</i>
								</a>
							</li>

							<li>
								<a className="btn-floating green" onClick={this.handleOpenChat}>
									<i className="material-icons">message</i>
								</a>
							</li>

							{(this.state.isPremium > 0 || ((this.state.numOfPurchaseOffers + this.state.numOfSaleOffers)<10)) ?
								<li>
									<a className="btn-floating purple">
										<i className="material-icons" onClick = {this.handleClickOnAddOffer}>
											add_shopping_cart
										</i>
									</a>
								</li> : null
							}
						</ul>
					</div> : null}

         	</div>
    	);
	}
}

export default Profile;
