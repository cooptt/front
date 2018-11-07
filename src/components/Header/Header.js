import React, { Component } from 'react';
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios';
import ModalSignIn from './../../components/Modals/ModalSignIn/ModalSignIn';
import ModalSignUp from './../../components/Modals/ModalSignUp/ModalSignUp';
import firebase from './../../Firebase'     // <------  import firebase
import config from '../../config'

import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'

import './Header.css'

class Header extends Component {
  constructor (props) {
    super(props);

    this.menuUnSigned = [
      <Link to="/videogames"><i className="material-icons left">videogame_asset</i>VideoGames</Link>,
      <Link to="/triples"><i className="material-icons left">share</i>Triples</Link>,
      <button onClick = {this.signInHandler}><i className="material-icons left">person</i>Sign-In</button>,
      <button onClick = {this.signUpHandler}><i className="material-icons left">person_add</i>Sign-Up</button>
    ];

    this.menuSigned = [
      <Link to="/videogames"><i className="material-icons left">videogame_asset</i>VideoGames</Link>,
      <Link to="/triples"><i className="material-icons left">share</i>Triples</Link>,
      <Link to="/users/profile/0"><i class="material-icons left">child_care</i>Perfil</Link>,
      <button onClick = {this.logOutHandler}><i class="material-icons left">person_outline</i>Sign-out</button>
    ];
    let currentMenuOptions = this.menuUnSigned
    if(this.props.userId!==null)
        currentMenuOptions = this.menuSigned

    this.state = {
      showSignIn: false,
      showSignUp: false,
      recent: false, // not used, to redirect when you are logged
      controls : {
          email: "",
          password: "",
          firstName: "",
          lastName: ""
      },
      currentMenuOptions
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
    console.log('Click');
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
          let path = `${config.server}/signin?loginServiceId=${user.userId}`
          console.log(path)
          return axios.post(path);
      })
      .then( response =>{
            console.log(response)
            //always is a new user (firebase)   
            let {userId} = response.data.data;
            let pathUpdate = `${config.server}/updateUserProperties?userId=${userId}`;
            return axios.post(pathUpdate,user)
      })
      .then( response=>{
            this.setState({
                showSignUp:false,
                currentMenuOptions: this.menuSigned
            });
            this.props.login();
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
          let path = `${config.server}/signin?loginServiceId=${user.userId}`
          return axios.post(path);
      })
      .then (response=>{

            this.setState({
                showSignIn:false,
                currentMenuOptions: this.menuSigned
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
          let path = `${config.server}/signin?loginServiceId=${user.userId}`
          return axios.post(path);
      })
      .then( response =>{
            /// always is updating, it's not necessary
            let {userId} = response.data.data;
            let pathUpdate = `${config.server}/updateUserProperties?userId=${userId}`;
            return axios.post(pathUpdate,user)
      })
      .then( response =>{

            this.setState({
                showSignIn:false,
                currentMenuOptions: this.menuSigned
            })
            this.props.login();
            console.log('hereeeeeeeeeeeeee header.js login')
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
              recent:true,
              currentMenuOptions: this.menuUnSigned
          })
      })
  }


  getMenu = () => {
    let children = [];
    //Inner loop to create children
    for (let i = 0; i < this.state.currentMenuOptions.length ; i++) {
      children.push(<li>{this.state.currentMenuOptions[i]}</li>);
    }
    //Create the parent and add the children
    return <ul class="right hide-on-med-and-down">{children}</ul>;
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
     console.log('props from header',this.props)
      return (
        // <div className="Header">
        //   <nav>
        //     <ul>
        //         <li><Link to="/"> Home </Link></li>
        //         <li><Link to="/users"> Usuarios </Link></li>
        //         <li><Link to="/videogames"> Videojuegos </Link></li>

        //         {(!this.props.authenticated)?<li onClick={this.signInHandler}> Iniciar Sesión  </li>:null}
        //         {(!this.props.authenticated)?<li  onClick={this.signUpHandler}> Registrarse </li>:null}
        //         {(this.props.authenticated)?<li><Link to={pathProfile}> Mi Perfil </Link></li>:null}
        //         {(this.props.authenticated)?<li  onClick={this.logOutHandler}> Cerrar Sesión </li>:null}

        //     </ul>
        //   </nav>
        //   {modalSignIn}
        //   {modalSignUp}
        // </div>

        // LINKS NEED TO BE ADDED

    <div className="navbar-fixed">
        <nav>
            <div className="nav-wrapper">
                <Link to="/">
                    <a className="left brand-logo">
                        <i className="small material-icons">
                            group_add
                        </i>
                        Matching
                    </a>
                </Link>
                
                {this.getMenu()}
            </div>
        </nav>
        {modalSignIn}
        {modalSignUp}
      </div>

     );
  }
}


export default Header;
