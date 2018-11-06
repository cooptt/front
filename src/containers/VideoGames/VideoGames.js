import React, { Component } from 'react';

import './VideoGames.css';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'

import Header from '../../components/Header/Header';
import Chat from '../../components/Chat/Chat';
import config from '../../config'


const fakeImageUrl = 'https://i11d.3djuegos.com/juegos/11552/god_of_war_ps4__nombre_temporal_/fotos/ficha/god_of_war_ps4__nombre_temporal_-3754795.jpg';

const videoGame0 = {
  title: 'GOD OF WAR PS4',
  image: 'catalogue/PS4/god_of_war.jpg',
  videoGameId: 0
};

const videoGame1 = {
  title: 'SPIDERMAN PS4',
  image: 'https://www.gamestop.com/common/images/lbox/127511b.jpg',
  videoGameId: 1
};

const videoGame2 = {
  title: 'GTA PS4',
  image: 'https://images-na.ssl-images-amazon.com/images/I/71fdwUZvh2L._SL1000_.jpg',
  videoGameId: 2
};

const fakeCarouselImage = Array(4).fill(videoGame0);
// Array(10).fill(matchingR);


// const fakeAutocompleteData = {
//   "Mario bros": 'https://http2.mlstatic.com/mario-bros-gorra-gamers-nintendo-envio-gratis-luigi-D_NQ_NP_953147-MLM26833406717_022018-F.jpg',
//   "Mario bros 64": 'https://images-na.ssl-images-amazon.com/images/I/810bIPlGhSL._SL1500_.jpg',
//   "Mario bros PS4": 'http://los40es00.epimg.net/los40/imagenes/2017/04/07/videojuegos/1491568225_523784_1491568523_noticia_normal.jpg',
//   "Mario bros 3DS": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtMmvfVfwmheyTSpI7yD5ucgeIaNY9FNkwDP0yBbuIKvIebcmutg',
//   "Mario bros PS4as": 'http://los40es00.epimg.net/los40/imagenes/2017/04/07/videojuegos/1491568225_523784_1491568523_noticia_normal.jpg',
//   "Mario bros 3DasS": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtMmvfVfwmheyTSpI7yD5ucgeIaNY9FNkwDP0yBbuIKvIebcmutg',
//   "Mario bros PSsads4": 'http://los40es00.epimg.net/los40/imagenes/2017/04/07/videojuegos/1491568225_523784_1491568523_noticia_normal.jpg',
//   "Mario bros 3DasdaS": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtMmvfVfwmheyTSpI7yD5ucgeIaNY9FNkwDP0yBbuIKvIebcmutg',
//   "Mario bros PS4asdasda": 'http://los40es00.epimg.net/los40/imagenes/2017/04/07/videojuegos/1491568225_523784_1491568523_noticia_normal.jpg',
//   "Mario bros 3DSadad": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtMmvfVfwmheyTSpI7yD5ucgeIaNY9FNkwDP0yBbuIKvIebcmutg',
//   "Mario bros PS4adsasda": 'http://los40es00.epimg.net/los40/imagenes/2017/04/07/videojuegos/1491568225_523784_1491568523_noticia_normal.jpg',
//   "Mario bros 3DSadsadsad": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtMmvfVfwmheyTSpI7yD5ucgeIaNY9FNkwDP0yBbuIKvIebcmutg',
//   "God of war": fakeImageUrl
// };

const fakeAutocompleteData = [{title: videoGame0.title, videoGameId: videoGame0.videoGameId, image: videoGame0.image},
{title: videoGame1.title, videoGameId: videoGame1.videoGameId, image: videoGame1.image},
{title: videoGame2.title, videoGameId: videoGame2.videoGameId, image: videoGame2.image}];


const fakeBuyOffers = ['','https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png','https://www.citrix.com/blogs/wp-content/uploads/2017/05/Citrix-Blog-User-Bio-Photo-5.png', 'https://userdefenders.com/wp-content/uploads/2018/05/Snapback-Hat-Model-324x324.jpg'];
const fakeSellOffers = ['','https://www.citrix.com/blogs/wp-content/uploads/2017/05/Citrix-Blog-User-Bio-Photo-5.png', 'https://userdefenders.com/wp-content/uploads/2018/05/Snapback-Hat-Model-324x324.jpg'];


const buyOffer = {
  id: 1, 
  userImageUrl: fakeBuyOffers[2],
  personName: 'Jaime Daniel',
  price: '89.2',
  videoGameName: 'Juego xxxxxx'
};

const buyOffers = Array(10).fill(buyOffer);

const sellOffer = {
  id: 2,
  userImageUrl: fakeBuyOffers[1],
  personName: 'Luis Vazquez',
  price: '90.2',
  videoGameName: 'Juego yyyyyy'
};

const sellOffers = Array(4).fill(sellOffer);

class Carousel extends Component {

    constructor(props) {
      super(props);
      this.state = {
        currentPos: 3,
        catalogue : []
      };

      
      this.nombreId = new Map();
      this.autoCompleteData = {};
      this.changeState = this.changeState.bind(this);
    }
  
    handleClick() {
      console.log('CENTER ', this.carousel.center);
      // this.carouselMatchings.next(1);
    };
  
    changeState(pos) {
      this.carousel.set(pos);
      this.props.updateImagePos(pos);
    }

    carouselItemTag = (carouselItem, index) => {
      console.log('URLLLLL - ', config.server + '/' + carouselItem.image);
      return (
        <a className = "carousel-item" key={index}>
          <img src={config.server + '/' + carouselItem.image} onClick={this.handleClick.bind(this)}></img>
        </a>
      );
    }

    componentDidMount() {
      
      fetch(`${config.server}/getCatalogue`)
      .then(response =>  response.json())
      .then(response => {
        this.setState({catalogue : response.data});
        
        console.log("IMAGE");
        console.log(this.state.catalogue);
      
        for(let i = 0; i < this.state.catalogue.length ; i++){
          this.nombreId.set(this.state.catalogue[i].title, this.state.catalogue[i].videoGameId);
          console.log(this.state.catalogue[i].title + '------->' + this.state.catalogue[i].videoGameId);
  
          this.autoCompleteData[this.state.catalogue[i].title] = config.server + '/' + this.state.catalogue[i].image;
        }
        this.aux();
      })
      .catch(err => console.error(err));
    }

    aux() {
      let elem = document.querySelector('#carousel1');
      this.carousel = M.Carousel.init(elem, {});
    }
    

    render() {
      return (
        <div>
          {/* 
            ES MEJOR RECIBIR LA INFO Y PASARLA?
            <AutocompleteInput name="catalogue-input" autoCompleteData={fakeAutocompleteData}/> 
          */}
          
          <br></br>

          <div className="autocomplete-catalogue-div">
            <AutocompleteInput name="catalogue-input" 
              autoCompleteData={this.autoCompleteData} 
              nombreId={this.nombreId} 
              funControl={this.changeState}/> 
          </div>
          
          <div className="black-div">
            <div className="carousel" id="carousel1">
              {this.state.catalogue.map(this.carouselItemTag)}
            </div>
          </div>
        </div>
      );
    }
  };
  
//AUTOCOMPLETE COMPONENT
// props = {
//   name: 'name of the autocomplete field id=name',
//   autoCompleteData: 'object name - url'
// };
class AutocompleteInput extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.handleAutoCompleteInputClick = this.handleAutoCompleteInputClick.bind(this);
    }
  
    handleAutoCompleteInputClick() {
      
      let videoGameName = document.getElementById(this.props.name).value;
      let videoGameId = this.props.nombreId.get(videoGameName);
  
      console.log('VideoGameName:' + videoGameName);
      console.log('VideoGameId:' + videoGameId);

      this.props.funControl(videoGameId);

      document.getElementById(this.props.name).value = '';
    }

    // componentDidMount() {

    //   this.catalogue = fakeAutocompleteData;
      
    //   for(let i = 0; i < this.catalogue.length; i++){
    //     this.nombreId.set(this.catalogue[i].title, this.catalogue[i].videoGameId);
    //     console.log(this.catalogue[i].title + '------->' + this.catalogue[i].videoGameId);
  
    //     this.autoCompleteData[this.catalogue[i].title] = this.catalogue[i].image;
    //   }


    // }

    componentDidMount() {
      let elem = document.getElementById(this.props.name);
      this.instanceAutocomplete = M.Autocomplete.init(elem, {
        data: this.props.autoCompleteData,
        onAutocomplete: this.handleAutoCompleteInputClick
        // limit: 4
      });

      // console.log(this.autoCompleteData);
    }
  
    render() {
      return(
        <div className={this.props.divStyle}>
          <div className="input-field">
            <i className="material-icons prefix tiny">search</i>
            <input type="text" id={this.props.name} className="autocomplete"></input>
            <label htmlFor={this.props.name}>VideoGame</label>
          </div>
        </div>
      );}
  }
  


// USEROFFERCARD
// Props {
//   id
//   userImageUrl
//   personName
//   price
// }

const UserOfferCard = (props) => {
  return (
    <div className="user">
      <div className="row valign-wrapper white hoverable z-depth-1">
        <div className="col s3">
          <div className="row"></div>
          <img src={props.userImageUrl} alt="" className="hoverable img-circle responsive-img"></img>
          <div className="row"></div>
        </div>
        <div className="col s9">
            
            <font color="blue">{props.personName}</font>
            <br></br>
            {props.email}   <font color="red">${props.price}</font>
            <br></br>
        </div>
      </div>
    </div>
  );
};

const UserOfferCardEmpty = (props) => {
  return (
    <div className="user">
      <div className="row valign-wrapper white">
        <div className="col s3">
          <div className="row"></div>
          <img src='' alt="" className="hoverable img-circle responsive-img"></img>
          <div className="row"></div>
        </div>
        <div className="col s9">
            <br></br>
            <br></br>
            <br></br>
            <br></br>   
        </div>
      </div>
    </div>
  );
};


class VideoGames extends Component {


    constructor(props) {
        super(props);
        this.state = {
          buyOffers : [],
          sellOffers: [],
          currentImagePos: 0
        }

        this.updateImagePos = this.updateImagePos.bind(this);
    }

    updateImagePos(pos) {
      this.setState({currentImagePos: pos});
      this.getVideoGameSellList(); 
      this.getVideoGameBuyList();
    }

    createTableWithCurrentOffers = () => {
      let table = [];

      // Outer loop to create parent
      let i = 0, j= 0;

      let children = [];
      //Inner loop to create children
      while (i < this.state.buyOffers.length || j < this.state.sellOffers.length) {
        if(i < this.state.buyOffers.length){
          children.push(
            <div className="col s4">
              <UserOfferCard 
                // id={this.state.buyOffers[i].id} 
                // userImageUrl={this.state.buyOffers[i].userImageUrl} 
                email={this.state.buyOffers[i].email}
                userImageUrl={fakeBuyOffers[2]}
                personName={this.state.buyOffers[i].firstName + ' ' + this.state.buyOffers[i].lastName} price={this.state.buyOffers[i].price}/>
            </div>
          );
          i++;
        }else children.push(<div className="col s4"><UserOfferCardEmpty/></div>);

        children.push(<div className="col s4"></div>);

        if(j < this.state.sellOffers.length){
          children.push(
            <div className="col s4">
              <UserOfferCard 
                // id={this.state.sellOffers[j].id} 
                // userImageUrl={this.state.buyOffers[i].userImageUrl} 
                userImageUrl={fakeBuyOffers[3]}
                email={this.state.sellOffers[j].email}
                personName={this.state.sellOffers[j].firstName + ' ' + this.state.sellOffers[j].lastName} 
                price={this.state.sellOffers[j].price}/>
            </div>
          );
          j++;
        }else children.push(<div className="col s4"><UserOfferCardEmpty/></div>);
      }

      //Create the parent and add the children
      table.push(<div className="row">{children}</div>);
  
      return table;
    }

    componentDidMount() {
      console.log(this.props);
      /*
		/getVideoGameSellList?videoGameId=0
        [{
            userId:0,
            loginServiceId:666,
            firstName:null,
            lastName:null,
            email:null,
            offerId:0,
            price:500
        } ]
    */

      this.getVideoGameSellList(); 
      this.getVideoGameBuyList();
      
    }

    getVideoGameSellList = _ => {
      fetch(`${config.server}/getVideoGameSellList?videoGameId=${this.state.currentImagePos}`)
      .then(response =>  response.json())
      .then(response => {
        
        console.log('AQUIIIII',response.data);
        this.setState({sellOffers : response.data});
      })
      .catch(err => console.error(err));
    };

    getVideoGameBuyList = _ => {
      fetch(`${config.server}/getVideoGameBuyList?videoGameId=${this.state.currentImagePos}`)
      .then(response =>  response.json())
      .then(response => {
        this.setState({buyOffers: response.data});
      })
      .catch(err => console.error(err));
    };

    render() {

		    let chat  = <Chat userId={0}/>
        console.log('USER ID EN VIDEOJUEGOS',this.props.authenticated);
        return(
            <div>

                {/* <Autocomplete name="catalogue" autoCompleteData={fakeAutocompleteData}/> */}
                <Header authenticated={this.props.authenticated} login={this.props.logInHandler} logout={this.props.logOutHandler} userId={this.props.userId}/>

                <br></br>
                
                <Carousel updateImagePos={this.updateImagePos}/>
                
                <br></br>

                <div className="center-sale-purchase-offers">
                  {this.createTableWithCurrentOffers()}
                </div>
                
                {chat}

            </div>
        );
    }
}



export default VideoGames;