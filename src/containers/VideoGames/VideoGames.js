import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css'

// CSS styles
import './VideoGames.css';

// External Components
import Carousel from './Carousel';
import UserOfferCard from './UserOfferCard';
import UserOfferCardEmpty from './UserOfferCardEmpty';
import Header from '../../components/Header/Header';
import SideNavChat from './SideNavChat';
import Footer from '../../components/Footer/Footer';

// Server URL
import config from '../../config'


// Props
// userId
// authenticated

class VideoGames extends Component {
	constructor(props) {
		super(props);
        this.state = {
			buyOffers : [],
			sellOffers: [],
			currentImagePos: 0
		}

        this.updateImagePos = this.updateImagePos.bind(this);
    }

    updateImagePos(pos) {
		this.setState({currentImagePos: pos});
		this.getVideoGameSellList();
		this.getVideoGameBuyList();
    }

    createTableWithCurrentOffers = () => {
		let table = [];
      	// Outer loop to create parent
      	let i = 0, j= 0;

      	let children = [];

		//Inner loop to create children
    	while (i < this.state.buyOffers.length || j < this.state.sellOffers.length) {
        	if(i < this.state.buyOffers.length){
          		children.push(
            		<div className="col s4">
              			<UserOfferCard
                			email={this.state.buyOffers[i].email}
                			// userImageUrl={this.state.buyOffers[i].userImageUrl}
                			userImageUrl={config.server + '/' + this.state.buyOffers[i].userImage}
                			personName={this.state.buyOffers[i].firstName + ' ' + this.state.buyOffers[i].lastName}
							price={this.state.buyOffers[i].price}
							userId={this.state.buyOffers[i].userId}
              			/>
            		</div>
          		);
          		i++;
        	}else children.push(<div className="col s4"><UserOfferCardEmpty/></div>);

			children.push(<div className="col s4"></div>);

        	if(j < this.state.sellOffers.length){
          		children.push(
					<div className="col s4">
						<UserOfferCard
							// userImageUrl={this.state.buyOffers[i].userImageUrl}
							userImageUrl={config.server + '/' + this.state.sellOffers[j].userImage}
							email={this.state.sellOffers[j].email}
							personName={this.state.sellOffers[j].firstName + ' ' + this.state.sellOffers[j].lastName}
							price={this.state.sellOffers[j].price}
							userId={this.state.sellOffers[j].userId}
						/>
					</div>
          		);
          		j++;
			}else children.push(<div className="col s4"><UserOfferCardEmpty/></div>);
		}

		//Create the parent and add the children
		table.push(<div className="row">{children}</div>);

		return table;
	}

    componentDidMount() {
		//this.updateImagePos(this.props.location.state.initialPos);
      	this.getVideoGameSellList();
      	this.getVideoGameBuyList();
    }

	/*
		/getVideoGameSellList?videoGameId=0
        [{
            userId:0,
            loginServiceId:666,
            firstName:null,
            lastName:null,
            email:null,
            offerId:0,
            price:500
        } ]
    */
    getVideoGameSellList = _ => {
		fetch(`${config.server}/getVideoGameSellList?videoGameId=${this.state.currentImagePos}`)
		.then(response =>  response.json())
		.then(response => {
			this.setState({sellOffers : response.data});
		})
		.catch(err => console.error(err));
	};

    getVideoGameBuyList = _ => {
		fetch(`${config.server}/getVideoGameBuyList?videoGameId=${this.state.currentImagePos}`)
		.then(response =>  response.json())
		.then(response => {
			this.setState({buyOffers: response.data});
		})
		.catch(err => console.error(err));
	};

    render() {
		let initialPosCar; 

		if(this.props.location.state === undefined) 
			initialPosCar = 0;
		else initialPosCar = this.props.location.state.initialPos; 

        return(
            <div>
                {/* <Autocomplete name="catalogue" autoCompleteData={fakeAutocompleteData}/> */}
                <Header
					authenticated={this.props.authenticated}
					login={this.props.logInHandler}
					logout={this.props.logOutHandler}
					userId={this.props.userId}
				/>

                <br></br>
				
                <Carousel updateImagePos={this.updateImagePos} initialPos={initialPosCar}/>

				<div className="row">
					<div className="col s6">
						<p className="purchase-title">Purchase Offers</p>

					</div>

					<div className="col s6">
						<p className="sale-title">Sale Offers</p>
					</div>
				</div>

				<br></br>

				<div className="center-sale-purchase-offers">
					{this.createTableWithCurrentOffers()}
                </div>

				{(this.props.userId!==null)?<SideNavChat userId={this.props.userId}/>:null}


				<Footer />
				{/*
						var elmnt = document.getElementById("scrollPos");
		elmnt.scrollTop = elmnt.scrollHeight;
				{chat}
				<div className = "scroll-test" id="scrollPos">
					<div>gol</div><div>gol</div><div>gol</div><div>gol</div><div>gol</div><div>gol</div>
					<div>gol</div><div>gol</div><div>gol</div><div>gol</div><div>gol</div><div>gol</div>
					<div>gol</div><div>gol</div><div>gol</div><div>gol</div><div>gol</div><div>gol</div>

				<div>gol</div><div>gol</div><div>gol</div><div>gol</div><div>gol</div>
				</div> */}
            </div>
        );
    }
}



export default VideoGames;
