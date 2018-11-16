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
import BinarySwitchCustomized from './BinarySwitchCustomized'; 

class BestRankings extends Component {

    constructor(props){
        super(props);
        this.state = {
            bestMatchings : [],
            bestMatchingsBeneficio : [],
            currentOffers: [],
            type: null
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
            fetch(`${config.server}/getRankedUsersByBenefit?userId=${this.props.userId}`)
            .then(response =>  response.json())
            .then(response => {
            console.log('BEST RANKINGS',response);
            if(response.data.length > 0){
                console.log('DATAAAAAAAAAAAAAAAAAAAAA', response.data)
                this.setState({bestMatchingsBeneficio : response.data});
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
        for(let i=0; i < this.state.currentOffers.length; i++){
            table.push( <UserOfferCardRated 
                userId={this.state.currentOffers[i].userId}
                matches={this.state.currentOffers[i].matches}
                personName={this.state.currentOffers[i].firstName + ' ' + this.state.currentOffers[i].lastName}
                email={this.state.currentOffers[i].email}
                userImage={this.state.currentOffers[i].userImage}
                type={this.state.type}
            />);
        }

        console.log('TABLE',table)
        return table;
    }

    changestate1 = _ => {
        this.setState({currentOffers : this.state.bestMatchings, type : 1});
        document.getElementById("button12").disabled = false;
    }

    changestate2 = _ => {
        this.setState({currentOffers : this.state.bestMatchingsBeneficio, type : 2});
        // this.setState({type : 2});
        document.getElementById("button11").disabled = false;
    }

    render() {
        return(
            <div>
                <p className="best-ranking-title">
                    Mejores Emparejamientos
                </p>

                <br></br>

                <div className="row">

                    <div className="col s4">
                        <button id="button11" type="button" onClick={this.changestate1}>Número de Matchings</button>
                    </div>

                    <div className="col s4">
                
                    </div>

                    <div className="col s4">
                        <button id="button12" type="button" onClick={this.changestate2}>Beneficio Económico</button>
                    </div>

                </div>


               
        
                {this.createTable()}
            </div>
        );
    }
}

export default BestRankings;