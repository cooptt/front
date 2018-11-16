import React from 'react';
import PaypalBtn from 'react-paypal-checkout';
import config from '../../../src/config.json'

export default class Paypal extends React.Component {
    render() {
        const onSuccess = (payment) => {
            // Congratulation, it came here means everything's fine!
            //alert('Post to backend to save the info in database')
            console.log("The payment was succeeded!", payment);

            fetch(`${config.server}/addExpiration?userId=${this.props.userId}` , {method: 'POST'})
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));

            this.props.getUserProperties();
        }

        const onCancel = (data) => {
            // User pressed "cancel" or close Paypal's popup!
            // alert("Do nothing")
            // console.log('The payment was cancelled!', data);
        }

        const onError = (err) => {
            // The main Paypal's script cannot be loaded or somethings block the loading of that script!
            alert("Show a message to the user")
            console.log("Error!", err);
        }

        let env = 'sandbox'; // you can set here to 'production' for production
        let currency = 'MXN'; // or you can set this value from your props or state
        let total = 100;  // same as above, this is the total amount (based on currency) to be
        let locale = 'en_US';
        // For Customize Style: https://developer.paypal.com/docs/checkout/how-to/customize-button/
        let style = {
            'label':'paypal',
            'tagline': false,
            'size':'medium',
            'shape':'pill',
            'color':'black'
        };

        const client = {
          sandbox:    'ASDryxof-WwM_RuyuAyUHvomfksVtsneLIN8RXB47_WMbBVhvhDPO4hWo0L6R6cFGrAeK0M-2Zq0V7yT',
          production: 'YOUR-PRODUCTION-APP-ID',
        }
        // In order to get production's app-ID, you will have to send your app to Paypal for approval first
        // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
        //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
        // For production app-ID:
        //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

        // You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
        return (

              <div>
              {/* <p> Pay $100 MXN to have access to all benefits for a month </p>
              <ul>
                <li>Benefit 1</li>
                <li>Benefit 2</li>
                <li>Benefit 3</li>
              </ul> */}
              <PaypalBtn
                  env={env}
                  client={client}
                  currency={currency}
                  total={total}
                  locale={locale}
                  style={style}
                  onError={onError}
                  onSuccess={onSuccess}
                  onCancel={onCancel} />
              </div>
        );
    }
}
