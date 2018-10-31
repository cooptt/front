import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home'
import Profile from './containers/Profile/Profile'
import Users from './containers/Users/Users'
import VideoGames from './containers/VideoGames/VideoGames'
import axios from 'axios'
import firebase from './Firebase'     // <------  import firebase

class App extends Component {


  state = {
      authenticated:false,
      userId: null
  }


  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) =>{
        if (user) {
            let path = `http://127.0.0.1:8080/signin?loginServiceId=${user.uid}`
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
              let path = `http://127.0.0.1:8080/signin?loginServiceId=${user.uid}`
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
              path="/users"  exact
              render={(props)=> <Users {...props} authenticated={this.state.authenticated} userId={this.state.userId} logInHandler={this.logInHandler} logOutHandler={this.logOutHandler}/>}
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
