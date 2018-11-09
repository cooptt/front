import React, { Component } from 'react';
import './tripletas.css';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'
import anime from 'animejs'
import {Redirect } from 'react-router-dom';
import config from '../../config'

import Header from '../../components/Header/Header';

const fakeImageUrls = ['','https://microhealth.com/assets/images/illustrations/personal-user-illustration-@2x.png','https://www.citrix.com/blogs/wp-content/uploads/2017/05/Citrix-Blog-User-Bio-Photo-5.png', 'https://userdefenders.com/wp-content/uploads/2018/05/Snapback-Hat-Model-324x324.jpg'];
//const fakeOffer = {image: fakeImageUrl, title: 'God of War', price: 442.3};

class Triples extends Component {

  constructor(props){
    super(props);
    this.state = {
      cycles: [],
      url1: '',
      url2: '',
      url3: '',
      stay:  this.props.userId!==null && parseInt(this.props.userId)===parseInt(this.props.match.params.userId)
    };
  }


  handleClick() {
    this.animacion1.play();
    this.animacion1.restart();

    this.animacion2.play();
    this.animacion2.restart();

    this.animacion3.play();
    this.animacion3.restart();

    this.animacionGame1.play();
    this.animacionGame2.play();
    this.animacionGame3.play();
  };

  componentDidMount() {
    console.log(this.props.match.params.userId);
    fetch(`${config.server}/getTriplets?userId=${this.props.match.params.userId}`)
		.then(response =>  response.json())
		.then(response => {
      this.setState({cycles : response.data});
      this.setState({url1: this.state.cycles[0][0].image});
      this.setState({url2: this.state.cycles[0][1].image});
      this.setState({url3: this.state.cycles[0][2].image});

		})
		.catch(err => console.error(err));

    var elems = document.querySelectorAll('#hola');
    this.instances = M.Carousel.init(elems, {numVisible: 5});
    this.animacion1 = anime({
      autoplay: false,
      targets: '#id1',
      borderRadius: '50%',
      translateX: [
        { value: -100, duration: 1500 },
        // { value: 0, duration: 1500 }
      ]
    });

    this.animacion2 = anime({
      autoplay: false,
      targets: '#id2',
      translateY: [
        { value: 300, duration: 1500 },
        // { value: 0, duration: 1500 }
      ],
      borderRadius: '50%',
      backgroundColor: '#f96'
    });

    this.animacion3 = anime({
      autoplay: false,
      targets: '#id3',
      translateX: [
        { value: 100, duration: 1500 },
        // { value: 0, duration: 1500 }
      ],
      borderRadius: '50%',
    });

    this.animacionGame1 = anime({
      autoplay: false,
      targets: '#image1',
      translateX: [
        { value: 245, duration: 1500 },
        { value: 800, duration: 4000 },
        // { value: 0, duration: 1500 }
      ],
      translateY: [
        { value: -173, duration: 1500 },
        // { value: 0, duration: 1500 }
      ],
      borderRadius: '50%',
      delay: 1000
    });

    this.animacionGame2 = anime({
      autoplay: false,
      targets: '#image2',
      translateX: [
        { value: 1000, duration: 1500 },
        { value: 725, duration: 4000, delay: 2000 },
        // { value: 0, duration: 1500 }
      ],
      translateY: [
        { value: -160, duration: 1500 },
        { value: 30, duration: 4000, delay: 2000 },
        // { value: 0, duration: 1500 }
      ],
      borderRadius: '50%',
      delay: 1000
    });

    this.animacionGame3 = anime({
      autoplay: false,
      targets: '#image3',
      translateX: [
        { value: 315, duration: 1500 },
        { value: 25, duration: 4000, delay: 3500 },
        // { value: 0, duration: 1500 }
      ],
      translateY: [
        { value: -60, duration: 1500 },
        { value: -250, duration: 4000, delay: 3500 },
        // { value: 0, duration: 1500 }
      ],
      borderRadius: '50%',
      delay: 1000
    });


  }


  render() {
    // const { videogames, videoGame } = this.state;

    if(this.state.stay===false)
      return <Redirect to='/'/>;
    return (
      <div className=''>

        <Header authenticated={this.props.authenticated} login={this.props.logInHandler} logout={this.props.logOutHandler} userId={this.props.userId}/>

        <br></br><br></br>
        <br></br><br></br>
        <button type="button" onClick = {this.handleClick.bind(this)}>PROBANDO</button>

        <div className="centerxx">
          {this.createTableWithCurrentOffers()}
        </div>

        <br></br><br></br>

        <div className="centerxx">
          <div id="image1" className="videogame-image-cycle">
            <img src={config.server + '/' + this.state.url1} alt="" class="responsive-img" width="70" heigh="70"></img>
          </div>


          <div id="image2" className="videogame-image-cycle">
            <img src={config.server + '/' + this.state.url2} alt="" class="responsive-img" width="70" heigh="70"></img>
          </div>

          <div id="image3" className="videogame-image-cycle">
            <img src={config.server + '/' + this.state.url2} alt="" class="responsive-img" width="70" heigh="70"></img>
          </div>
        </div>

        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        <br></br><br></br>


      <Footer/>



      </div>
    );
  }


  createTableWithCurrentOffers = () => {
    let table = [];

    // Outer loop to create parent
    let i = 0;
    let x = 1;
    let offersLength = 1;
    while(i < offersLength) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < 3; j++) {
        children.push(<div className="col s4"><UserOfferCard id={'id' + x} pos={x}/></div>);
        x++;
      }
      i++;
      //Create the parent and add the children
      table.push(<div className="row">{children}</div>);
    }

    return table;
  }


}


// OFFERCARD COMPONENT
// props = {
//   image: 'url image',
//   title: 'videoGames Name',
//   price: 'price',
//   user: 'offers user NEEDS TO BE ADDED',
//   handleClick(): 'NEEDS TO BE ADDED'
// }

const UserOfferCard = (props) => {
  return (
    <div className="user" id={props.id}>
      <div class="row valign-wrapper white hoverable z-depth-1">
        <div class="col s3">
          <div className="row"></div>
          <img src={fakeImageUrls[props.pos]} alt="" class="hoverable img-circle responsive-img"></img>
          <div className="row"></div>
        </div>
        <div class="col s9">
            Jaime Daniel Martinez Moreno
            <br></br>
            Videogame Name <br></br>
            $$ Price<br></br>
            <br></br>

        </div>
      </div>
    </div>
  );
};


// FOOTER COMPONENT
// Replace for better organization
const Footer = (props) => {
  return(
    <footer class="page-footer black">
      <div class="container">
        <div class="row">
          <div class="col l6 s12">
            <h5 class="white-text">Matching System</h5>
              <p class="grey-text text-lighten-4">You can buy and sell your videogames in this site.</p>
          </div>

          <div class="col l4 offset-l2 s12">
            <h5 class="white-text">Links</h5>
              <ul>
                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    Facebook
                  </a>
                </li>

                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    Git-Hub
                  </a>
                </li>

                <li>
                  <a class="grey-text text-lighten-3" href="#!">
                    Link 3
                  </a>
                </li>
              </ul>
          </div>
        </div>
      </div>

      <div class="footer-copyright">
        <div class="container">
          © 2014 Copyright Text
          {/* <a class="grey-text text-lighten-4 right" href="#!">More Links</a> */}
        </div>
      </div>
    </footer>
  );
};

export default Triples;
