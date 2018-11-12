import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'

// CSS styles
import './VideoGames.css';

// External Components
import Carousel from './Carousel';
import UserOfferCard from './UserOfferCard';
import Chat from '../../components/Chat/Chat';
import Header from '../../components/Header/Header';
import UserOfferCardEmpty from './UserOfferCardEmpty';

// Server URL
import config from '../../config'




class SideNavChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }

    componentDidMount() {
    
    }



    render() {
        return(
            <div>
                <ul id="slide-out" className="sidenav">
                    <li>
                        <div className="user-view">
                            <div className="background">
                                <img src="https://media.giphy.com/media/l0MYI0zWiJlsahOk8/giphy.gif" width="300" height="200"></img>
                            </div>

                            <img className="circle" src="https://media.licdn.com/dms/image/C5603AQHyayaxPF3UMA/profile-displayphoto-shrink_200_200/0?e=1545264000&v=beta&t=s8M2QpHyZECTIT6qt15Zi7HN3IKGVtaefaQTzstI-Z0"></img>
                        
                            <span className="white-text name">Jaime Martinez</span>
                            <span className="white-text email">jaimedmm@outlook.com</span>
                        </div>
                    </li>
                
                    <li> 
                        <Chat userId={this.props.userId} destId={this.props.destId}/>
                    </li>
                </ul>
                
                {/* <a className="btn-floating btn-large waves-effect waves-light blue right" onClick={this.handleOpenChat.bind(this)}><i className="material-icons">message</i></a> */}
            </div>
        );
    }
}

export default SideNavChat;