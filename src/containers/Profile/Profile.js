import React, { Component } from 'react';
import Header from '../../components/Header/Header';

class Profile extends Component {
    render(){
        console.log(this.props);
        return(
            <div>
              <Header authenticated={this.props.authenticated} login={this.props.logInHandler} logout={this.props.logOutHandler} userId={this.props.userId}/>
              <h1> React component with  {this.props.match.params.userId} user info</h1>
            </div>
        )
    }
}

export default Profile
