import React, { Component } from 'react';

// CSS styles
import './profile.css';
import 'materialize-css/dist/css/materialize.min.css';

// External Components
import OfferCard from './OfferCard';

import config from '../../config';


class SaleAndPurchaseOffers extends Component{

    constructor(props) {
        super(props);
    }

    createTableWithCurrentOffers = () => {
        let table = [];
    
        // Outer loop to create parent
        let i = 0;
        let offersLength = this.props.offerList.length;
        while(i < offersLength) {
            let children = [];
            //Inner loop to create children
            for (let j = 0; j < 4 && i < offersLength; j++) {
                children.push(<div className="col s3"><OfferCard offer={this.props.offerList[i++]}/></div>);
            }
            //Create the parent and add the children
            table.push(<div className="row">{children}</div>);
        }
    
        return table;
    }

    render() {
        return(
            <div>
                {this.createTableWithCurrentOffers()}
            </div>
        );
    }
}

export default SaleAndPurchaseOffers;