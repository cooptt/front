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
        let elem = document.querySelector('.sidenav');
        this.sideNav = M.Sidenav.init(elem, {});
    }

    handleOpenChat() {
        this.sideNav.open();
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
                        
                            <span class="white-text name">Jaime Martinez</span>
                            <span class="white-text email">jaimedmm@outlook.com</span>
                        </div>
                    </li>
                
                    <li> 
                        <Chat userId={0}/> 
                        </li>
                </ul>
                
                <a class="btn-floating btn-large waves-effect waves-light blue right" onClick={this.handleOpenChat.bind(this)}><i class="material-icons">message</i></a>
            </div>
        );
    }
}

export default SideNavChat;