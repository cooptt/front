import React, { Component } from 'react';

import M from 'materialize-css/dist/js/materialize.min.js'

// External Components
import Header from '../../components/Header/Header';
import SideNavChat from '../VideoGames/SideNavChat';

import UserInfoAndRating from '../Profile/UserInfoAndRating';
import Modal from '../Tripletas/Modal';
import SaleAndPurchaseOffers from '../Profile/SaleAndPurchaseOffers';

import Footer from '../../components/Footer/Footer';

// CSS styles
import '../Profile/profile.css';
import 'materialize-css/dist/css/materialize.min.css'

// Server URL
import config from '../../config'

class User extends Component {
	constructor(props) {
		super(props);
		//this.handleClick = this.handleClick.bind(this);

		this.saleOffers = [];
		this.purchaseOffers = [];

		this.state = {
			currentOfferList: [], 
			offersType: 'Ofertas de venta'
		};
	}

  	componentDidMount() {
		let elem= document.querySelector('.fixed-action-btn');
		this.optionButton = M.FloatingActionButton.init(elem, {hoverEnabled: false});

		let sideNavElem = document.querySelector('.sidenav');
      	this.sideNav = M.Sidenav.init(sideNavElem, {});
		
		this.getSaleOffers();
		this.getPurchaseOffers();
	}
	
	getSaleOffers = _ => {
        fetch(`${config.server}/getUserSellList?userId=${this.props.match.params.userId}`)
        .then(response => response.json())
        .then(response => {
			this.saleOffers = response.data;
			if(this.state.offersType === 'Ofertas de venta')
				this.setState({currentOfferList: response.data});
        })
        .catch(err => console.error(err));
    }
    
    getPurchaseOffers = _ => {
        fetch(`${config.server}/getUserBuyList?userId=${this.props.match.params.userId}`)
        .then(response => response.json())
        .then(response =>{
			this.purchaseOffers = response.data;
			if(this.state.offersType === 'Ofertas de compra')
			 	this.setState({currentOfferList: response.data});
		 } )
        .catch(err => console.error(err));
    }

	// handleCloseActionModal = _ => {
	// 	this.getSaleOffers();
	// 	this.getPurchaseOffers();
	// }
  
  	handleOpenChat = _ => {
    	this.sideNav.open();
	}

	handleClickOnChangeOfferType = _ => {
		if(this.state.offersType === 'Ofertas de compra'){
			this.setState({currentOfferList: this.saleOffers, offersType: 'Ofertas de venta'});
		}else if(this.state.offersType === 'Ofertas de venta'){
			this.setState({currentOfferList: this.purchaseOffers, offersType: 'Ofertas de compra'});
		}
	}

	render() {
		let destUserId = parseInt(this.props.match.params.userId);

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
					<SaleAndPurchaseOffers offerList={this.state.currentOfferList}/>
				</div>

                <Footer/>

				{(this.props.userId!==null)?
					<SideNavChat userId={this.props.userId} destId={destUserId}/>:null}

				
				<div className="fixed-action-btn">
          			<a className="btn-floating btn-large blue darken-4 pulse">
            			<i className="large material-icons">menu</i>
          			</a>
        			
					<ul>
          				<li>
							<a className="btn-floating green" onClick={this.handleOpenChat}>
								<i className="material-icons">message</i>
							</a>
						</li>
          			</ul>

      			</div>
         	</div>
    	);
	}
}

export default User;
