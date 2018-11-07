import React, { Component } from 'react';
import './profile.css';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import config from '../../config'
import Header from '../../components/Header/Header';

const fakeImageUrl = 'https://i11d.3djuegos.com/juegos/11552/god_of_war_ps4__nombre_temporal_/fotos/ficha/god_of_war_ps4__nombre_temporal_-3754795.jpg';

const matching = {
  tittle: 'GOD OF WAR',
  image: fakeImageUrl,
  videoGameId: 9 
};

const matchingR = {
  tittle: 'GOD OF WAR',
  image: 'https://www.gamestop.com/common/images/lbox/127511b.jpg',
  videoGameId: 9 
};

const fakeMatchingsIni = Array(4).fill(matching);
const fakeMatchingsResponse = Array(10).fill(matchingR);




//AUTOCOMPLETE COMPONENT
// props = {
//   name: 'name of the autocomplete field id=name',
//   autoCompleteData: 'object name - url'
// };
class AutocompleteInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let elem = document.querySelector('#' + this.props.name);

    this.instanceAutocomplete = M.Autocomplete.init(elem, {
      data: this.props.autoCompleteData,
      // limit: 4
    });
  }

  render() {
    return(
      <div className={this.props.divStyle}>
        <div className="input-field">
          <i className="material-icons prefix tiny">search</i>
          <input type="text" id={this.props.name} className="autocomplete"></input>
          <label for={this.props.name}>VideoGame</label>
        </div>
      </div>
    );}
}

class modelo extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div></div>
    );
  }
}

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

  componentDidMount() {
    let elem= document.querySelector('.fixed-action-btn');
    this.optionButton = M.FloatingActionButton.init(elem, {});

    elem = document.querySelector('.modal');
    this.instanceModal = M.Modal.init(elem, {});

    this.getSaleOffers();
    this.getPurchaseOffers();
  }

  getSaleOffers = _ => {
    fetch(`${config.server}/getUserSellList?userId=0`)
    .then(response => response.json())
    .then(response => {
      this.setState({offerList: response.data});
      this.saleOffers = response.data
    })
    .catch(err => console.error(err));
  }

  getPurchaseOffers = _ => {
    fetch(`${config.server}/getUserBuyList?userId=0`)
    .then(response => response.json())
    .then(response => this.purchaseOffers = response.data)
    .catch(err => console.error(err));
  }
  
  render() {
    return(
      <div>
        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4>Add Offer</h4>
            
            <br></br><br></br>

            <AutocompleteInput name="videoGames-input" autoCompleteData={this.props.autoCompleteData}/>

            <br></br><br></br>

            <InputFieldCustomized name="price-field" icon="monetization_on" initialText="Price of your offer (dollars Currency)"/>

            <br></br><br></br><br></br>

            <BinarySwitchCustomized name="offerType" firstOption="Purchase Offer" secondOption="Sale Offer"/>
            
            <br></br>
          </div>
          
          <div className="modal-footer" onClick = {this.handleClickOnCreateOffer.bind(this)}>
            <a className="modal-close waves-effect waves-blue btn-flat blue">
              <font color="white">Add Offer</font>
            </a>
          </div>
        
          {/*CHANGE LOGIC'S BUTTON*/}
        </div>

        <div className="fixed-action-btn">
        <a className="btn-floating btn-large red">
          <i className="large material-icons">menu</i>
        </a>
        <ul>
          <li><a className="btn-floating green"><i className="material-icons">delete</i></a></li>
          <li><a className="btn-floating purple"><i className="material-icons" onClick = {this.handleClickOnChange.bind(this)}>forward</i></a></li>
          <li><a className="btn-floating blue"><i className="material-icons" onClick = {this.handleClick.bind(this)}>add_shopping_cart</i></a></li>
        </ul>
      </div>

        {/* <div class="row">
          <OfferList data = {this.state.offerList} />
        </div> */}
        <div className="type-offers-div">{this.state.typeOfOffers}</div>

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


const OfferCard = (props) => {
  return (
    <div>
      <div className="card hoverable">

      {/* LOCAL TESTING CHANGE src={'http://localhost:8080/' + props.image} */}
      <img className="activator" src={config.server + '/' + props.offer.image} width="200" height="230"></img>

      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">
          <font size="3"> {props.offer.title.substring(0, 15)} </font>
          <i className="material-icons right tiny">
            more_vert
          </i>
        </span>
        
        <p align='right'> 
          <a href="#UserGUI">
            <font size="2"> 
              jaime Daniel 
            </font> 
          </a>
        </p>

        <p align='right'>
          <a href="#">
            <font color="#cca300">
              ${props.offer.price}
            </font>
          </a>
        </p>
      </div>

      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">
          Description
          <i className="material-icons right">
            close
          </i>
        </span>
        <p>Juego en buen estado, 1 mes de uso, incluye caja xD!</p>
      </div>
      
    </div>
  </div>
  );
};



class Profile extends Component {
  constructor(props) {
    super(props);
    //this.handleClick = this.handleClick.bind(this);
    
    this.catalogue = [];
    this.nombreId = new Map();
    this.autoCompleteData = {};
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

    })
    .catch(err => console.error(err));
  }
  

  render() {
    return (
      <div className="1">
 
        <Header 
          authenticated={this.props.authenticated} 
          login={this.props.logInHandler} 
          logout={this.props.logOutHandler} 
          userId={this.props.userId}
        />
        
        <br></br><br></br><br></br>

        <OptionButton nombreId={this.nombreId} autoCompleteData={this.autoCompleteData}/>

      </div>
    );
  }
}







export default Profile;
