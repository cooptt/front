import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'

// CSS styles
import './User.css';

// External Components
import Header from '../../components/Header/Header';
import VideoGameOfferCard from './VideoGameOfferCard';
import UserOfferCardEmpty from '../VideoGames/UserOfferCardEmpty';
import SideNavChat from '../VideoGames/SideNavChat'
import Chat from '../../components/Chat/Chat'
// Server URL
import config from '../../config'


class User extends Component {

        state = {
            buyOffers : [],
            sellOffers: [],
            destId: null
        };




    componentDidMount() {
        var elem = document.querySelector('.fixed-action-btn');
        this.actionButton = M.FloatingActionButton.init(elem, {});
        this.getVideoGameSellList(); 
        this.getVideoGameBuyList();
    }

    getVideoGameSellList = _ => {
		fetch(`${config.server}/getUserSellList?userId=${this.props.match.params.userId}`)
		.then(response =>  response.json())
		.then(response => {
			this.setState({sellOffers : response.data});
		})
		.catch(err => console.error(err));
	};

    getVideoGameBuyList = _ => {
		fetch(`${config.server}/getUserBuyList?userId=${this.props.match.params.userId}`)
		.then(response =>  response.json())
		.then(response => {
			this.setState({buyOffers: response.data});
		})
		.catch(err => console.error(err));
	};

    
    handleClickOnStar() {
        document.getElementById('star5').classList.remove('checked');
    }

    sendMessagePersonalHandler =()=>{
        let value = this.props.match.params.userId
        this.setState({destId:value})
    }

    render() {
        return(
            <div>
                
                <Header
					authenticated={this.props.authenticated} 
					login={this.props.logInHandler}
					logout={this.props.logOutHandler} 
					userId={this.props.userId}
				/>

                <br></br>
                <br></br>



                <br></br>
                <br></br>
                <div className="user-picture z-depth-5">
                    <img src="https://media.licdn.com/dms/image/C5603AQGVDf_wWsYxxA/profile-displayphoto-shrink_200_200/0?e=1544054400&v=beta&t=XTGNgUxiWEa5-KSepTwu1Q-Ykcu2_uWe7b-M0jcNJp8" width="200" height="200" className="hoverable"></img>
                </div>

                <br></br>

                <div className="stars-div">
				    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked"></span>
                    <span className="fa fa-star checked" id="star5" onClick={this.handleClickOnStar.bind(this)}></span>
                </div>


                <br></br>
                <br></br>
                <br></br>

                {(this.props.userId!==null)?
                <SideNavChat userId={this.props.userId} destId={parseInt(this.state.destId)}/>:null}


                {/* BUTTON SEND MESSAGE */}
                {(this.props.userId!==null && parseInt(this.props.userId)!==parseInt(this.props.match.params.userId))?
                <button onClick={this.sendMessagePersonalHandler}>
                    Only if this is not my profile
                </button>:null}
            </div>
        );
    }
}

export default User;