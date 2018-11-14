import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import config from '../../config'
import './profile.css'

class UserInfoAndRating extends Component {

    constructor(props){
        super(props);
        this.state = {
            userRating : '0.0',
            userImage : null,
            userEmail : null,
            userName : null,
        }
    }

    handleClickOnStar = (index) => {
        this.colorStars(index);
    }
    
    colorStars = (index) => {
        for(let i = 5; i >= 1; i--){
            document.getElementById('star' + i).classList.remove('checked-profile');
        }
    
        for(let i = 1; i <= index; i++){
            document.getElementById('star' + i).classList.add('checked-profile');
        }
    
        this.sendUserRating(index);
    }
    
    sendUserRating = (rating) => {
        fetch(`${config.server}/addRatingToUser?ratingUserId=${this.props.userId}&ratedUserId=${this.props.destUserId}&rating=${rating}`,{method: 'POST'})
        .then(response => response.json())
        .then(response => {
            console.log(response)

            this.updateRating();
        })
        .catch(err => console.error(err));
    }

    updateRating= _ => {
        fetch(`${config.server}/getUserProperties?userId=${this.props.destUserId}`)
        .then(response => response.json())
        .then(response => {
            this.setState({userRating: response.data.myRating});
        })
        .catch(err => console.error(err));
    }

    componentDidMount() {
        fetch(`${config.server}/getUserProperties?userId=${this.props.destUserId}`)
        .then(response => response.json())
        .then(response => {

            this.setState({userRating: response.data.myRating, 
                userImage : response.data.userImage,
                userEmail : response.data.email,
                userName : response.data.firstName + ' ' + response.data.lastName
            });
            console.log('USERIMAGE',response.data);
        })
        .catch(err => console.error(err));
    }

    render(){
        return(
            <div>
                <div className="user-picture-div-container">
                    <img className="user-picture-profile hoverable z-depth-3" src={config.server + '/' + this.state.userImage}></img>
                    {/* <img className="user-picture-profile hoverable z-depth-3" src="https://media.licdn.com/dms/image/C5603AQHyayaxPF3UMA/profile-displayphoto-shrink_200_200/0?e=1545264000&v=beta&t=s8M2QpHyZECTIT6qt15Zi7HN3IKGVtaefaQTzstI-Z0"></img> */}
                </div>

                <br></br>
            
                {(parseInt(this.props.userId) !== this.props.destUserId) ?
                    <div className="stars-div-profile">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                        <span className="fa fa-star checked-profile" id="star1" onClick={() => {this.handleClickOnStar(1)}}></span>
                        <span className="fa fa-star checked-profile" id="star2" onClick={() => {this.handleClickOnStar(2)}}></span>
                        <span className="fa fa-star checked-profile" id="star3" onClick={() => {this.handleClickOnStar(3)}}></span>
                        <span className="fa fa-star checked-profile" id="star4" onClick={() => {this.handleClickOnStar(4)}}></span>
                        <span className="fa fa-star checked-profile" id="star5" onClick={() => {this.handleClickOnStar(5)}}></span>
                    </div> 
                : null }

                <div className="user-information-profile">
                    <center>
                        <p className="rating-profile">Rating {this.state.userRating}</p>
                        <p className="user-name-profile">{this.state.userName}</p>
                        <p className="email-profile">{this.state.userEmail}</p>
                    </center>
                </div>
            </div>
        );
    }
}

export default UserInfoAndRating;