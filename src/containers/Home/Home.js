import React, { Component } from 'react';
import Header from '../../components/Header/Header';
class Home extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
        <Header authenticated={this.props.authenticated} login={this.props.logInHandler} logout={this.props.logOutHandler} userId={this.props.userId}/>
        <h1> home/ with page info</h1>
      </div>
    );
  }
}

export default Home;
