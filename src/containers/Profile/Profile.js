import React, { Component } from 'react';
import './profile.css';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import config from '../../config'
import {Link} from 'react-router-dom'
import Header from '../../components/Header/Header';
import SideNavChat from '../VideoGames/SideNavChat';
import BestRankings from './BestRankings';
import AutocompleteAddOffer from './AutocompleteAddOffer';
import OfferCard from './OfferCard';
import UserInfoAndRating from './UserInfoAndRating';


class BinarySwitchCustomized extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div className="switch" align="center">
        <label>
          {this.props.firstOption}
         
          <input type="checkbox" id={this.props.name}></input>
          <span className="lever"></span>
          
          {this.props.secondOption}
        </label>
      </div>
    );
  }
}

// Make it a Function Component
class InputFieldCustomized extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div>
        <div className="input-field col s4">
          <i className="material-icons prefix">{this.props.icon}</i>
          <input id={this.props.name} type="text"></input>
          <label htmlFor={this.props.name}>{this.props.initialText}</label>
        </div>
      </div>
    );
  }
}


// class OptionButton extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount() {
//     let elem= document.querySelector('.fixed-action-btn');
//     this.optionButton = M.FloatingActionButton.init(elem, {});
//   }

//   render() {
//     return(
//       <div class="fixed-action-btn">
//         <a class="btn-floating btn-large red">
//           <i class="large material-icons">menu</i>
//         </a>
//         <ul>
//           <li><a class="btn-floating green"><i class="material-icons">delete</i></a></li>
//           <li><a class="btn-floating blue"><i class="material-icons" onClick = {this.handleClick.bind(this)}>add_shopping_cart</i></a></li>
//         </ul>
//       </div>
//     );
//   }
// }


class OptionButton extends Component{

  constructor(props) {
    super(props);

    this.counter = 0;
    this.saleOffers = [];
    this.purchaseOffers = [];
    this.state ={ offerList: [], typeOfOffers: 'Sale Offers'};

    this.flag = 0;
  }

  handleClick() {
    console.log('CLICK ' + this.counter);

    this.instanceModal.open();
    this.counter++;
  };

  handleClickOnCreateOffer() {
    console.log('AQUIIII')
    console.log(this.props.nombreId);

    let videoGameName = document.querySelector('#videoGames-input').value;
    let price = document.querySelector('#price-field').value;

    let videoGameId = this.props.nombreId.get(videoGameName);

    console.log('VideoGameName:' + videoGameName);
    console.log('price:' + price);

    // CHECK
    let userId = this.props.userId;

    let finalUrl;
    
    // Sale offer
    if(document.querySelector('#offerType').checked)
      finalUrl = `${config.server}/addSellOffer?userId=${userId}&videoGameId=${videoGameId}&price=${price}`;
    else
      finalUrl = `${config.server}/addBuyOffer?userId=${userId}&videoGameId=${videoGameId}&price=${price}`;
    
    
    fetch(finalUrl,{method: 'POST'})
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

    // addSellOffer?userId=0&videoGameId=0&price=500
    this.getSaleOffers();
    this.getPurchaseOffers();
    // addBuyOffer?userId=0&videoGameId=1&price=600
  }

  handleClickOnChange() {
    if(this.flag === 0){
      this.setState({typeOfOffers: 'Purchase Offers'});
      this.setState({offerList: this.purchaseOffers});
      this.flag = 1;
    }else{
      this.setState({typeOfOffers: 'Sale Offers'});
      this.setState({offerList: this.saleOffers});
      this.flag = 0;
    }
  }

  handleClickOnBest() {
    this.instanceModal.open();
  }

  componentDidMount() {
    let elem= document.querySelector('.fixed-action-btn');
    this.optionButton = M.FloatingActionButton.init(elem, {});

    let elem1 = document.getElementById('modal1');
    this.instanceModal = M.Modal.init(elem1, {});

    let elem2 = document.getElementById('modal2')
    this.instanceModal2 = M.Modal.init(elem2, {});

    this.getSaleOffers();
    this.getPurchaseOffers();
  }

  getSaleOffers = _ => {
    fetch(`${config.server}/getUserSellList?userId=${this.props.userId}`)
    .then(response => response.json())
    .then(response => {
      this.setState({offerList: response.data});
      this.saleOffers = response.data
    })
    .catch(err => console.error(err));
  }

  getPurchaseOffers = _ => {
    fetch(`${config.server}/getUserBuyList?userId=${this.props.userId}`)
    .then(response => response.json())
    .then(response => this.purchaseOffers = response.data)
    .catch(err => console.error(err));
  }
  
  render() {
    return(
      <div>
        <div id="modal2" class="modal">
          <div class="modal-content">
            <h4>Best Matchings</h4>
            <BestRankings userId={this.props.userId}/>
          </div>
        </div>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Add Offer</h4>
            
            <br></br><br></br>

            <AutocompleteAddOffer name="videoGames-input" autoCompleteData={this.props.autoCompleteData}/>

            <br></br><br></br>

            <InputFieldCustomized name="price-field" icon="monetization_on" initialText="Price of your offer (dollars Currency)"/>

            <br></br><br></br><br></br>

            <BinarySwitchCustomized name="offerType" firstOption="Purchase Offer" secondOption="Sale Offer"/>
            
            <br></br>
          </div>
          
         
            <a className="modal-close waves-effect waves-blue btn-flat blue"  onClick = {this.handleClickOnCreateOffer.bind(this)}>
              <font color="white">Add Offer</font>
            </a>
        
          {/*CHANGE LOGIC'S BUTTON*/}
        </div>

        <div className="fixed-action-btn">
          <a className="btn-floating btn-large blue darken-4 pulse">
            <i className="large material-icons">menu</i>
          </a>
        <ul>

          {(this.props.userId === this.props.destId) ?
            <li><a className="btn-floating yellow darken-2"><i className="material-icons" onClick = {this.handleClickOnBest.bind(this)}>local_offer</i></a></li>
          :null}

          <li><a className="btn-floating green" onClick={this.props.handleOpenChat}><i className="material-icons">message</i></a></li>
          
          {(this.props.userId === this.props.destId) ?
            <li><a className="btn-floating purple"><i className="material-icons" onClick = {this.handleClickOnChange.bind(this)}>forward</i></a></li>
          :null}

          {(this.props.userId === this.props.destId) ?
            <li><a className="btn-floating red"><i className="material-icons" onClick = {this.handleClick.bind(this)}>add_shopping_cart</i></a></li>
          :null}
          </ul>
      </div>

        {/* <div class="row">
          <OfferList data = {this.state.offerList} />
        </div> */}
        <br></br><br></br>
        <p className="type-offer-title-profile">{this.state.typeOfOffers}</p>

        <br></br>       <br></br>        <br></br>
        <div className="centerx">
          {this.createTableWithCurrentOffers()}
        </div>

    </div>
    );

  }

  createTableWithCurrentOffers = () => {
    let table = [];

    // Outer loop to create parent
    let i = 0;
    let offersLength = this.state.offerList.length;
    while(i < offersLength) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < 4 && i < offersLength; j++) {
        children.push(<div className="col s3"><OfferCard offer={this.state.offerList[i++]}/></div>);
      }
      //Create the parent and add the children
      table.push(<div className="row">{children}</div>);
    }

    return table;
  }

}




class Profile extends Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    
    this.state = {destId: null};
    this.catalogue = [];
    this.nombreId = new Map();
    this.autoCompleteData = {};
    this.handleOpenChat = this.handleOpenChat.bind(this);

    this.sendMessagePersonalHandler = this.sendMessagePersonalHandler.bind(this);
  }

  componentDidMount() {
    fetch(`${config.server}/getCatalogue`)
    .then(response =>  response.json())
    .then(response => {
      this.catalogue = response.data;

      // console.log(this.catalogue);
    
      for(let i = 0; i < this.catalogue.length ; i++){
        this.nombreId.set(this.catalogue[i].title, this.catalogue[i].videoGameId);
        console.log(this.catalogue[i].title + '------->' + this.catalogue[i].videoGameId);

        this.autoCompleteData[this.catalogue[i].title] = config.server + '/' +this.catalogue[i].image;
        //this.autoCompleteDataset.push({this.catalogue[i].tittle :'http://localhost:8080/' + ''});
      }

      //console.log(this.autoCompleteData);

      let elem = document.querySelector('.sidenav');
      this.sideNav = M.Sidenav.init(elem, {});


    })
    .catch(err => console.error(err));
  }
  
  handleOpenChat() {
    this.sideNav.open();

  }

  
  sendMessagePersonalHandler =()=>{
    let value = this.props.match.params.userId
    this.setState({destId:value})
  }

  render() {
    return (
      <div>
 
        <Header 
          authenticated={this.props.authenticated} 
          login={this.props.logInHandler} 
          logout={this.props.logOutHandler} 
          userId={this.props.userId}
        />
        
        <br></br><br></br><br></br>

        <UserInfoAndRating userId={this.props.userId} destUserId={this.props.match.params.userId}/>


        {(this.props.userId!==null)?
                <SideNavChat userId={this.props.userId} destId={parseInt(this.state.destId)}/>:null}

        <OptionButton nombreId={this.nombreId} 
          autoCompleteData={this.autoCompleteData} 
          userId={this.props.userId}
          handleOpenChat={this.handleOpenChat}
          funci={this.sendMessagePersonalHandler}
          destId={parseInt(this.props.match.params.userId)}/>
      </div>
    );
  }
}







export default Profile;
