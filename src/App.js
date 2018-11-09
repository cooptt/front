import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home'
import Profile from './containers/Profile/Profile'
import User from './containers/User/User'
import VideoGames from './containers/VideoGames/VideoGames'
import axios from 'axios'
import firebase from './Firebase'     // <------  import firebase
import config from './config'
import Triples from './containers/Tripletas/triples';

class App extends Component {
  state = {
      authenticated:false,
      userId: null
  }

  componentWillMount(){
    firebase.auth().onAuthStateChanged((user) =>{  
        console.log('jaaaaaaaaaaaames',user);
              
        if (user) {
            let path = `${config.server}/signin?loginServiceId=${user.uid}`
            axios.post(path)
            .then(response=>{
                let {userId} = response.data.data;
                this.setState({
                    authenticated:true,
                    userId
                })
            })
        }else{
            this.setState({
                authenticated:false,
                userId:null
            })
        }
    })
  }

  logInHandler = () =>{

      firebase.auth().onAuthStateChanged((user) =>{
          if (user) {
              let path = `${config.server}/signin?loginServiceId=${user.uid}`
              axios.post(path)
              .then(response=>{
                  let {userId} = response.data.data;
                  this.setState({
                      authenticated:true,
                      userId
                  })
              })
          }else{
              this.setState({
                  authenticated:false,
                  userId:null
              })
          }
      })
  }

  logOutHandler = () =>{
      this.setState({
          authenticated:false,
          userId:null
      })
  }


  render() {
    return (
      <div>
        <Switch>
          <Route
              path="/" exact
              render={(props)=> <Home {...props} authenticated={this.state.authenticated} userId={this.state.userId} logInHandler={this.logInHandler} logOutHandler={this.logOutHandler}/>}
          />
          <Route
              path="/users/:userId"  exact
              render={(props)=> <User {...props} authenticated={this.state.authenticated} userId={this.state.userId} logInHandler={this.logInHandler} logOutHandler={this.logOutHandler}/>}
          />
          <Route
              path="/users/profile/:userId"
              render={(props)=> <Profile {...props} authenticated={this.state.authenticated} userId={this.state.userId} logInHandler={this.logInHandler} logOutHandler={this.logOutHandler}/>}
          />
          <Route
              path="/videogames"
              render={(props)=> <VideoGames {...props} authenticated={this.state.authenticated} userId={this.state.userId} logInHandler={this.logInHandler} logOutHandler={this.logOutHandler}/>}
          />

          <Route
              path="/triples/:userId"
              render={(props)=> <Triples {...props} authenticated={this.state.authenticated} userId={this.state.userId} logInHandler={this.logInHandler} logOutHandler={this.logOutHandler}/>}
          />

          <Route
              render={
                ()=> (
                    <div>
                        <h1>404 Not found </h1>
                        Add a component to redirect
                    </div>
                )
              }
          />
        </Switch>
    </div>
    );
  }
}

export default App;
