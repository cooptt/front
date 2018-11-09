import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'

// CSS styles
import './User.css';

// External Components
import Header from '../../components/Header/Header';
import VideoGameOfferCard from './VideoGameOfferCard';
import UserOfferCardEmpty from '../VideoGames/UserOfferCardEmpty';

// Server URL
import config from '../../config'


class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buyOffers : [],
			sellOffers: [],
        };

        this.userId = 0;

    }

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

    // offerId:1,
    // videoGameId:1,
    // title:"Halo",
    // image:"halo.jpg",
    // price:500 },

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
                        <br></br>
              			<VideoGameOfferCard 
                			// userImageUrl={this.state.buyOffers[i].userImageUrl} 
                			imageUrl={config.server + '/' + this.state.buyOffers[i].image}
                			title={this.state.buyOffers[i].title} 
                            price={this.state.buyOffers[i].price}
                            videoGameId={this.state.buyOffers[i].videoGameId}
              			/>
            		</div>
          		);
          		i++;
        	}else children.push(<div className="col s4"><UserOfferCardEmpty/></div>);

			children.push(<div className="col s4"></div>);

        	if(j < this.state.sellOffers.length){
          		children.push(
                    
					<div className="col s4">
                        <br></br>
						<VideoGameOfferCard
							// userImageUrl={this.state.buyOffers[i].userImageUrl} 
                			imageUrl={config.server + '/' + this.state.sellOffers[j].image}
                			title={this.state.sellOffers[j].title} 
                            price={this.state.sellOffers[j].price}
                            videoGameId={this.state.sellOffers[j].videoGameId}
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
    
    handleClickOnStar() {
        document.getElementById('star5').classList.remove('checked');
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

                <div className="center-sale-purchase-offers">
					{this.createTableWithCurrentOffers()}
                </div>


                <div class="fixed-action-btn">
                    <a class="btn-floating btn-large red">
                        <i class="large material-icons">mode_edit</i>
                    </a>
                    <ul>
                        <li><a class="btn-floating red"><i class="material-icons">insert_chart</i></a></li>
                        <li><a class="btn-floating yellow darken-1"><i class="material-icons">format_quote</i></a></li>
                        <li><a class="btn-floating green"><i class="material-icons">publish</i></a></li>
                        <li><a class="btn-floating blue"><i class="material-icons">attach_file</i></a></li>
                    </ul>
                </div>
      

            </div>
        );
    }
}

export default User;