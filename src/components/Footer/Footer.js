import React from 'react';

import 'materialize-css/dist/css/materialize.min.css'
import './Footer.css'
// FOOTER COMPONENT
// Replace for better organization
const Footer = (props) => {
    return(
      <footer className="page-footer black">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="white-text">Matching System</h5>
                <p className="grey-text text-lighten-4">You can buy and sell your videogames in this site.</p>
            </div>
  
            <div className="col l4 offset-l2 s12">
              <h5 className="white-text">Links</h5>
                <ul>
                  <li>
                    <a className="grey-text text-lighten-3" href="#!">
                      Facebook
                    </a>
                  </li>
  
                  <li>
                    <a className="grey-text text-lighten-3" href="#!">
                      Git-Hub
                    </a>
                  </li>
  
                  <li>
                    <a className="grey-text text-lighten-3" href="#!">
                      Link 3
                    </a>
                  </li>
                </ul>
            </div>
          </div>
        </div>
  
        <div className="footer-copyright">
          <div className="container">
            © 2014 Copyright Text
            {/* <a class="grey-text text-lighten-4 right" href="#!">More Links</a> */}
          </div>
        </div>
      </footer>
    );
  };

export default Footer;