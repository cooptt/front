import React, { Component } from 'react';
import Header from '../../components/Header/Header';

import M from 'materialize-css/dist/js/materialize.min.js'
import Footer from '../../components/Footer/Footer'

import './Home.css';

import config from '../../config.json';

class Home extends Component {

	componentDidMount() {
		let elem = document.getElementById('carouselhome');
		let instances = M.Carousel.init(elem, {fullWidth: true, indicators: true});
	}

	render() {
		console.log(this.props);
		return (
			<div>
				<Header authenticated={this.props.authenticated} login={this.props.logInHandler} logout={this.props.logOutHandler} userId={this.props.userId}/>
					
						<div className="carousel" id="carouselhome">
							{/* <a className="carousel-item" href="#three!"><img src={config.server + '/' + 'Fotos/god_home.jpg'}></img></a> */}
							
							<a className="carousel-item carousel-itemhome" href="#three!"><img src="https://wallpapersite.com/images/wallpapers/god-of-war-3840x2160-ps4-kratos-son-atreus-1128.jpg"></img></a>
							<a className="carousel-item carousel-itemhome" href="#one!"><img src="https://i.imgur.com/T29SRKW.jpg"></img></a>
							<a className="carousel-item carousel-itemhome" href="#two!"><img src="https://wallpapertag.com/wallpaper/full/b/2/7/113957-most-popular-video-games-wallpaper-1920x1080-for-tablet.jpg"></img></a>
						</div>	
				
					<br></br>
					<Footer/>
			</div>
		);
	}
}

export default Home;
