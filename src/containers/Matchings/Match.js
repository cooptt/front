import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import anime from 'animejs';

// CSS styles
import './Match.css';

// External Components


// Server URL
import config from '../../config'

let fakeLink ='https://scontent.fmex10-2.fna.fbcdn.net/v/t1.0-1/c8.0.48.48/p48x48/1238272_181721035347780_1987327127_n.jpg?_nc_cat=108&_nc_ht=scontent.fmex10-2.fna&oh=d2f899d07c5c7abb9f33147b121ca47b&oe=5C85327D';
let fakeLink1 = 'https://www.atomix.com.au/media/2015/06/atomix_user31.png';
let fakeLink2 = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNngF0RFPjyGl4ybo78-XYxxeap88Nvsyj1_txm6L4eheH8ZBu';


// PROPS
// match: [Array of size 2] of this type
// userId: 1,
// firstName: 'Jimbo',
// lastName: null,
// videoGameId: 1,
// title: 'Gow',
// image: 'gow.jpg',
// offerId: 3,
// price: 500,
// diff: 0 

// PROPS
// autoStartAnimation
class Match extends Component {

    constructor(props){
        super(props);
        this.state = {isFirstTime: true};
    }

    getAnimation(target, xAnimation, yAnimation, delayAnimation){
		// console.log(target, xAnimation, yAnimation);
    	return anime({
      		autoplay: false,
      		targets: target,
      		translateX: xAnimation,
            translateY: yAnimation
            // direction: 'alternate',
		});
	}

    componentDidMount() {

        this.userAnimations = [];

		this.gameAnimations = [];

        this.gameAnimations.push(
            this.getAnimation(
                '#gameAnimation1-match',
                [{ value: '1180%', duration: 4000, delay: 500}], 
                [{ value: 0}]
            )
        );

        this.gameAnimations.push(
            this.getAnimation(
                '#gameAnimation2-match',
                [{ value: '-1173%', duration: 4000, delay: 3000}], 
                [{ value: 0}]
            )
        );
        
        this.setState({isFirstTime: false});

        let elem = document.getElementById('tooltipRestartMatchAnimation');
        this.tooltipInstance = M.Tooltip.init(elem, {});  
    }

    getSpaces(spaces){
        let aux = [];
        for(let i = 0; i < spaces; i++)
            aux.push(<br key = {'br' + i}></br>);
        return aux;
    }

    startAnimation = _ => {
        for(let i = 0; i < this.gameAnimations.length; i++){
            this.gameAnimations[i].play();
        }
    }

    restartAnimation = _ => {
        for(let i = 0; i < this.gameAnimations.length; i++){
            this.gameAnimations[i].restart();
        }
    }

    // userId: 1,
    // firstName: 'Jimbo',
    // lastName: null,
    // videoGameId: 1,
    // title: 'Gow',
    // image: 'gow.jpg',
    // offerId: 3,
    // price: 500,
    // diff: 0 

    render() {
        if(this.props.startAnimation)
            this.startAnimation();
            
        if(!this.state.isFirstTime && !this.props.startAnimation)
            this.restartAnimation();
            
        return(
            <div>
                <center>
                    <h4>
                        Emparejamiento
                    </h4>

                    <div className="progress green lighten-4">
                        <div className="green darken-2 determinate progressBar-match"></div>
                    </div>
                </center>

                <div className='userName1-match'>
                    {this.props.match[0].firstName}
                </div>

                <div className='userName2-match'>
                    {this.props.match[1].firstName}
                </div>

                <img src={config.server + '/' + this.props.match[0].userImage} className="hoverable img-circle responsive-img user1-pos-match z-depth-3" id="userAnimation1-match"></img>
                <img src={config.server + '/' + this.props.match[1].userImage} className="hoverable img-circle responsive-img user2-pos-match z-depth-3" id="userAnimation2-match"></img>
               
                <img src={config.server + '/' + this.props.match[0].image} className="hoverable responsive-img image1-match" id="gameAnimation1-match"></img>
                <img src={config.server + '/' + this.props.match[1].image}className="hoverable responsive-img image2-match" id="gameAnimation2-match"></img>
               
                {this.getSpaces(7)}

                <div align="right">
                    <i align="right" className="material-icons" data-position="bottom" data-tooltip="Click to restart! " id='tooltipRestartMatchAnimation' onClick={this.restartAnimation}>fast_rewind</i>
                </div>
                
            </div>
        );
    }
}

export default Match;