import React, { Component } from 'react';
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios';
import ModalSignIn from './../../components/Modals/ModalSignIn/ModalSignIn';
import ModalSignUp from './../../components/Modals/ModalSignUp/ModalSignUp';
import firebase from './../../Firebase'     // <------  import firebase

import './Header.css'
class Header extends Component {
  state = {
      showSignIn: false,
      showSignUp: false,
      recent: false, // not used, to redirect when you are logged
      controls : {
          email: "",
          password: "",
          firstName: "",
          lastName: ""
      }
  }

  /// start modals functions ////
  signInHandler = () =>{
    if(!this.state.showSignIn){
        this.setState({
          showSignIn:true,
          showSignUp:false
        })
    }
  }


  signUpHandler = () =>{
    if(!this.state.showSignUp){
        this.setState({
          showSignIn:false,
          showSignUp:true
        })
    }
  }


  modalClosedHandler = () =>{
    this.setState({
        showSignIn: false,
        showSignUp: false,
    })
  }

  /// end modals functions ////



  ////////////// change events /////////////////
  changeEmailHandler = (event) =>{
       let newControls = {
          ...this.state.controls
       }
       newControls.email = event.target.value;
       this.setState({
          controls:newControls
       })

  }


  changePasswordHandler = (event) =>{
       let newControls = {
          ...this.state.controls
       }
       newControls.password = event.target.value;
       this.setState({
          controls:newControls

       })
  }

  changeFirstNameHandler = (event) =>{
       let newControls = {
          ...this.state.controls
       }
       newControls.firstName = event.target.value;
       this.setState({
          controls:newControls

       })
  }

  changeLastNameHandler = (event) =>{
       let newControls = {
          ...this.state.controls
       }
       newControls.lastName = event.target.value;
       this.setState({
          controls:newControls

       })
  }


  /////////////// end change events /////////////////







  /////// start submit events ////

  submitHandler = (event) =>{
      event.preventDefault();
      let {email,password,firstName,lastName} = this.state.controls;
      let user = {}
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( response => {
          user = {
              firstName,
              lastName,
              email,
              userId: response.user.uid
          };
          let path = `http://127.0.0.1:8080/signin?loginServiceId=${user.userId}`
          return axios.post(path);
      })
      .then( response =>{
            //always is a new user (firebase)
            let {userId} = response.data.data;
            let pathUpdate = `http://127.0.0.1:8080/updateUserProperties?userId=${userId}`;
            return axios.post(pathUpdate,user)
      })
      .then( response=>{
            this.setState({
                showSignUp:false
            });
            this.props.logout();
      })
      .catch( error => {
          alert('Email con mal formato o ya registrado');
          console.log(error);
      });
  }

  loginWithEmailHandler = (event) =>{
      event.preventDefault();
      let {email,password,firstName,lastName} = this.state.controls;
      let user={}
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then( response => {
          user = {
              firstName,
              lastName,
              email,
              userId: response.user.uid
          };
          let path = `http://127.0.0.1:8080/signin?loginServiceId=${user.userId}`
          return axios.post(path);
      })
      .then (response=>{

            this.setState({
                showSignIn:false
            })
            this.props.login();
            //always is an old user (firebase)
            this.setState({
                recent:true
            })
      })
      .catch( error => {
        alert('Correo no existe o contraseña incorrecta');
        console.log(error);
      });
  }

  loginWithGoogleHandler = () =>{
      let googleAuthProvider = new firebase.auth.GoogleAuthProvider;
      let user = {}
      firebase.auth().signInWithPopup(googleAuthProvider)
      .then( data => {
          let displayName = data.user.displayName.split(" ");
          user = {
              firstName:displayName[0],
              lastName:displayName[displayName.length-1],
              email: data.user.email,
              userId: data.user.uid
          }
          let path = `http://127.0.0.1:8080/signin?loginServiceId=${user.userId}`
          return axios.post(path);
      })
      .then( response =>{
            /// always is updating, it's not necessary
            let {userId} = response.data.data;
            let pathUpdate = `http://127.0.0.1:8080/updateUserProperties?userId=${userId}`;
            return axios.post(pathUpdate,user)
      })
      .then( response =>{

            this.setState({
                showSignIn:false
            })
            this.props.login();
            this.setState({
                recent:true
            })
      })
      .catch( error =>{
        alert('Intenta iniciar sesión de nuevo');
          console.log(error);
      })
  }




  logOutHandler = () =>{
      firebase.auth().signOut()
      .then( ()=>{
          this.props.logout();
          this.setState({
              recent:true
          })
      })
  }



  render() {
      let {showSignIn,showSignUp} = this.state;
      let modalSignIn=null;
      let modalSignUp=null;

      if(showSignIn)
          modalSignIn =
            <ModalSignIn
                loginEmail={this.loginWithEmailHandler}
                loginGoogle={this.loginWithGoogleHandler}
                changeEmail={this.changeEmailHandler}
                changePassword={this.changePasswordHandler}
                clicked={this.modalClosedHandler}
            />

      if(showSignUp)
          modalSignUp =
            <ModalSignUp
                submit = {this.submitHandler}
                changeEmail={this.changeEmailHandler}
                changePassword={this.changePasswordHandler}
                changeFirstName={this.changeFirstNameHandler}
                changeLastName={this.changeLastNameHandler}
                clicked={this.modalClosedHandler}
            />

      let pathProfile=""
      if(this.props.userId!==null)
        pathProfile=`/users/profile/${this.props.userId}`;

      return (
        <div className="Header">
          <nav>
            <ul>
                <li><Link to="/"> Home </Link></li>
                <li><Link to="/users"> Usuarios </Link></li>
                <li><Link to="/videogames"> Videojuegos </Link></li>
                {(!this.props.authenticated)?<li onClick={this.signInHandler}> Iniciar Sesión  </li>:null}
                {(!this.props.authenticated)?<li  onClick={this.signUpHandler}> Registrarse </li>:null}
                {(this.props.authenticated)?<li><Link to={pathProfile}> Mi Perfil </Link></li>:null}
                {(this.props.authenticated)?<li  onClick={this.logOutHandler}> Cerrar Sesión </li>:null}
            </ul>
          </nav>
          {modalSignIn}
          {modalSignUp}
        </div>
     );
  }
}

export default Header;
