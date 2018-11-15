import React, { Component } from 'react';
import anime from 'animejs'
import 'materialize-css/dist/css/materialize.min.css'
import {Redirect } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js'

// CSS styles
import './Matchings.css';

// External Components
import Header from '../../components/Header/Header';

import Cycle from './Match';

import Modal from './Modal';

import Footer from '../../components/Footer/Footer';

// Server URL
import config from '../../config'
import Match from './Match';

const fakeImageUrls = ['','https://media.licdn.com/dms/image/C5603AQHyayaxPF3UMA/profile-displayphoto-shrink_200_200/0?e=1545264000&v=beta&t=s8M2QpHyZECTIT6qt15Zi7HN3IKGVtaefaQTzstI-Z0','https://www.citrix.com/blogs/wp-content/uploads/2017/05/Citrix-Blog-User-Bio-Photo-5.png', 'https://userdefenders.com/wp-content/uploads/2018/05/Snapback-Hat-Model-324x324.jpg'];
//const fakeOffer = {image: fakeImageUrl, title: 'God of War', price: 442.3};

class Matchings extends Component {
	constructor(props){
		super(props);
		this.state = {
			loading: true,
			matchings: [],
			currentMathchingPos: 0,
			startAnimation: false,
			stay:  this.props.userId !== null && parseInt(this.props.userId) === parseInt(this.props.match.params.userId)
		};

		this.cardId = 0;
 	}

	/**
	 * 
	 * [
     [ { userId: 0,
      firstName: 'Felipe',
      lastName: null,
      videoGameId: 0,
      title: 'Halo',
      image: 'halo.jpg',
      offerId: 1,
      price: 500,
      diff: 0 },
    { userId: 1,
      firstName: 'Jimbo',
      lastName: null,
      videoGameId: 1,
      title: 'Gow',
      image: 'gow.jpg',
      offerId: 3,
      price: 500,
      diff: 0 },
    { userId: 2,
      firstName: 'Chore',
      lastName: null,
      videoGameId: 2,
      title: 'Crash',
      image: 'crash.jpg',
      offerId: 5,
      price: 500,
      diff: 0 } ],

  [ { userId: 0,
      firstName: 'Felipe',
      lastName: null,
      videoGameId: 0,
      title: 'Halo',
      image: 'halo.jpg',
      offerId: 1,
      price: 500,
      diff: 0 },
    { userId: 1,
      firstName: 'Jimbo',
      lastName: null,
      videoGameId: 1,
      title: 'Gow',
      image: 'gow.jpg',
      offerId: 3,
      price: 500,
      diff: 0 },
    { userId: 2,
      firstName: 'Chore',
      lastName: null,
      videoGameId: 4,
      title: 'Dbz',
      image: 'dbz.jpg',
      offerId: 8,
      price: 500,
      diff: 0 } ],
  ]
*/
 
  handleCloseModal = _ => {
		console.log('CLOSE MODAL');
		this.setState({startAnimation: false});
	}

	handleOpenModal = _ => {
		console.log('OPEN MODAL');
		this.setState({startAnimation: true});
	}

  	componentDidMount() {
    	// fetch(`${config.server}/getTriplets?userId=${this.props.match.params.userId}`)
		// 	.then(response =>  response.json())
		// 	.then(response => {
		// 	// console.log(response);
		// 	if(response.data.length > 0){
		// 		this.setState({matchings : response.data});
		// 	}

		// 	this.setState({loading: false});
		// })
		// .catch(err => console.error(err));

        let fakeMatch = [ { userId: 0,
            firstName: 'Felipe',
            lastName: 'Mendoza',
            videoGameId: 0,
            title: 'Asesinos',
            image: 'catalogue/PS4/assasyuns_creed_odyssey.jpg',
            offerId: 1,
            price: 500,
            userImage: 'Fotos/profile7.png',
            diff: 0 },
          { userId: 1,
            firstName: 'Jimbo',
            lastName: 'Martinez',
            videoGameId: 1,
            title: 'Crash Bandicot',
            userImage: 'Fotos/profile8.png',
            image: 'catalogue/PS4/crash_bandicoot.jpg',
            offerId: 3,
            price: 500,
            diff: 0 }];

        let fakeMatchings = Array(4).fill(fakeMatch);

        this.setState({matchings : fakeMatchings});

		let elem = document.getElementById('animationModal-matchings');
		this.modalInstance = M.Modal.init(elem, {onCloseEnd: this.handleCloseModal, onOpenEnd: this.handleOpenModal});
	}

	render() {
		console.log(this.state.currentMathchingPos);

    	if(this.state.stay === false)
      		return <Redirect to='/'/>;

		let modalContent = <div></div>;

		if(this.state.matchings.length > 0)
			modalContent = <Match match={this.state.matchings[this.state.currentMathchingPos]} startAnimation={this.state.startAnimation}></Match>;

		return (
			<div>

				<Header authenticated={this.props.authenticated} login={this.props.logInHandler} logout={this.props.logOutHandler} userId={this.props.userId}/>

				<center>
					<br></br>
					<h5>Emparejamientos posibles</h5>
				</center>

				{this.state.matchings.length === 0 ? 
					<center>
						<font color="gray">
							<h5>No tienes emparejamientos aún</h5>
							<br></br><br></br><br></br><br></br><br></br><br></br>
							<br></br><br></br><br></br><br></br><br></br><br></br>
							<br></br><br></br><br></br><br></br><br></br><br></br>
							<br></br><br></br><br></br>

						</font>
					</center>
					: null
				}

				<Modal modalName='animationModal-matchings' modalContent={modalContent}/>;
				
				<br></br>

				{this.createMatchingCards()}	

				<Footer/>
			</div>
		);
	}

	handleClickOnOffer(target){
		anime({
			autoplay: true,
			targets: target,
			translateX: [{value: '120%', duration: 3000}, {value: '0%', duration: 3000}],
			borderRadius: '50%'
	  	});
	}

	createMatchingCards = _ => {

		let table = [];

		for(let i = 0; i < this.state.matchings.length; i+=2){
			let column1 = null;
			let column2 = null;
			
			column1 = <div className = "col s6">
						{this.createTripleCard(this.state.matchings[i], i)}
					</div>;

			if( i + 1 < this.state.matchings.length){
				column2 = <div className = "col s6">
							{this.createTripleCard(this.state.matchings[i + 1], i + 1)}
						</div>;
			}

			table.push(
				<div className = "row" key = {'row' + table.length}>
					{column1}
					{column2}
				</div>
			);

		}

		return table;
	}

	handleClickOnAnimationButton(index) {
		this.setState({currentCyclePos: index});
	}

	createTripleCard = (currentMatch, index) => {
		let content = [];
		
		for (let i = 0; i < currentMatch.length; i++, this.cardId++) {
			let value = this.cardId;
			console.log('CURRENT TRILE', currentMatch[i])
			content.push(
				<div key = {'offerCard-match' + value}>
					<div className={"offer-pos" + i + '-matchings'}  id={'offerCard' + value} onClick = {() => this.handleClickOnOffer(`#offerCard${value}`)}>
						<SingleTripleOfferCard
							pos = {i + 1}
							videoGameName = {currentMatch[i].title}
							userName = {currentMatch[i].firstName + ' ' + currentMatch[i].lastName} 
							price = {currentMatch[i].price}
							id={value}
							imageUrl={config.server + '/' + currentMatch[i].userImage}/>
							
					</div>
					{(i===1) ?
						<a data-target="animationModal-matchings" key = {'matchingButton' + index} onClick = { () => { this.handleClickOnAnimationButton(index)}} 
							className="btn-floating modal-trigger light-green darken-3 button-pos-matchings">
							<i className="material-icons">play_circle_filled</i>
						</a> : null
					}
				</div>
			);
			//this.cardId++;
		}

		// Return Triple Card
    	return (
			<div>
				<div className="center-match-matchings">
					{content}
				</div>
			</div>
		);
  	}
}


// OFFERCARD COMPONENT
// props = {
//	 pos: ''
//   userName: '',
// 	 videoGameName: ''
//   price: 'price',
// }

const SingleTripleOfferCard = (props) => {
	return (
    	<div>
      		<div className="row valign-wrapper white hoverable z-depth-1" id={props.id}>
        		<div className="col s12">
          			<br></br>
					<center>
						<img src={props.imageUrl} className="hoverable img-circle-matchings responsive-img"></img>
						<p className="userName-match-matchings">{props.userName}</p>
						<p className="videoGameName-match-matchings">{props.videoGameName}</p>
						<p className="price-match-matchings">${props.price}</p>
					</center>	
        		</div>
      		</div>
    	</div>
  	);
};




export default Matchings;
