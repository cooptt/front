import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'

// External Components
import AutocompleteInput from './AutocompleteInput';

// Server URL
import config from '../../config'

class Carousel extends Component {

    constructor(props) {
		super(props);
		this.state = {
			catalogue : []
		};
		
		this.carousel = null;
		this.nombreId = new Map();
		this.autoCompleteData = {};
		this.updateImagePos = this.updateImagePos.bind(this);
		this.handleClickOnCarousel = this.handleClickOnCarousel.bind(this);
	}
  
    handleClick() {
		console.log('CENTER ', this.carousel.center);
		// this.carouselMatchings.next(1);
	};
  
	updateImagePos(pos) {
		this.carousel.set(pos);
		this.props.updateImagePos(pos);
		console.log('CENTER ', this.carousel.center);
    }

    carouselItemTag = (carouselItem, index) => {
		// console.log('URLLLLL - ', config.server + '/' + carouselItem.image);
		return (
			<a className = "carousel-item" key={index}>
				<img src={config.server + '/' + carouselItem.image} onClick={this.handleClick.bind(this)}></img>
			</a>
      );
    }

	// REVISAR POR QUE DESAPARECE LA INSTANCIA this.carousel
	handleClickOnCarousel() {
		console.log('THIS', this);
		if(this.state.catalogue.length > 0) {
			let elem = document.querySelector('#carousel1');
			this.carousel = M.Carousel.getInstance(elem);

			let catalogueSize = this.state.catalogue.length;
			console.log('TAMANO CAROUSEL',catalogueSize);
			let newPos = (this.carousel.center + catalogueSize) % catalogueSize; 
			console.log('NEW POS', newPos);
			this.props.updateImagePos(newPos);
		}
	}

    componentDidMount() {
		fetch(`${config.server}/getCatalogue`)
		.then(response =>  response.json())
		.then(response => {
			this.setState({catalogue: response.data});
        
        	// console.log("IMAGE");
        	// console.log(this.state.catalogue);
      		for(let i = 0; i < this.state.catalogue.length ; i++){
          		this.nombreId.set(this.state.catalogue[i].title, this.state.catalogue[i].videoGameId);
          		// console.log(this.state.catalogue[i].title + '------->' + this.state.catalogue[i].videoGameId);
          		this.autoCompleteData[this.state.catalogue[i].title] = `${config.server}/${this.state.catalogue[i].image}`;
        	}
		
			let elem = document.querySelector('#carousel1');
			
			this.carousel = M.Carousel.init(elem, {onCycleTo: this.handleClickOnCarousel});
			this.updateImagePos(this.props.initialPos);
			console.log('THIS2',this);
      })
      .catch(err => console.error(err));
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
						updateImagePos={this.updateImagePos}
					/> 
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

  export default Carousel;