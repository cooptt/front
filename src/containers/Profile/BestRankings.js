import React, { Component } from 'react';
import anime from 'animejs'
import 'materialize-css/dist/css/materialize.min.css'
import {Redirect } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js'

// CSS styles
import './BestRankings.css'

// External Components
import UserOfferCardRated from './UserOfferCardRated';
import config from '../../config'

class BestRankings extends Component {

    constructor(props){
        super(props);
        this.state = {
            bestMatchings : []
        }
    }

    componentDidMount() {
        fetch(`${config.server}/getRankedUsers?userId=${this.props.userId}`)
        .then(response =>  response.json())
        .then(response => {
        console.log('BEST RANKINGS',response);
        if(response.data.length > 0){
            this.setState({bestMatchings : response.data});
        }
    })
    .catch(err => console.error(err));
    }


    // userId: 2,
    // loginServiceId: 18,
    // firstName: null,
    // lastName: null,
    // email: null,
    // matches: 4 

    createTable = _ => {
        let table = [];
        for(let i=0; i < this.state.bestMatchings.length; i++){
            table.push( <UserOfferCardRated 
                userId={this.state.bestMatchings[i].userId}
                matches={this.state.bestMatchings[i].matches}
                personName={this.state.bestMatchings[i].firstName + ' ' + this.state.bestMatchings[i].lastName}
                email={this.state.bestMatchings[i].email}
                userImage={this.state.bestMatchings[i].userImage}
            />);
        }

        console.log('TABLE',table)
        return table;
    }

    render() {
        return(
            <div>
                <p className="best-ranking-title">
                    Mejores Emparejamientos
                </p>
                {this.createTable()}
            </div>
        );
    }
}

export default BestRankings;