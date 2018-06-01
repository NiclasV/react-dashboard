import React, { Component } from 'react';
import Spinkit from './Spinkit';

class Currency extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.fetchCurrency = this.fetchCurrency.bind(this);
  }

  componentWillMount() {
    this.fetchCurrency()
  }

  fetchCurrency() {
    const apiKey = "a7cc445b2adf51e6b1fc6b09c2887c9a";
    const baseUrl = "http://data.fixer.io/api/latest?access_key=";

    fetch(baseUrl + apiKey)
    .then(response => response.json())
    .then(response => {
      this.setState({
        currencyData: response
      })
    })
    .catch((error) => {
      this.fetchCurrency()
      console.log(error, "ERROR ERROR")
    })
  }

  refreshBtn() {
    //Refresh-method used for the refreshbutton, does another fetch and updates
    return (
      <button className="btn btn-block btn-default uppercase" id="update" onClick={this.fetchCurrency}>Uppdatera&nbsp;&nbsp;
        <i className="fas fa-sync-alt"></i></button>
    );
  }

  render() {
    //If the currency isnt fetched yet (with the data from the fetch in the state, run the loading spinner)
    if(!this.state.currencyData) 
      return (
        <div className="module-box">
          <Spinkit />
        </div>
      );
    //If its fetched, and the state set with data, display parts of the data
    let fontSize = {fontSize: "1.3em",};
    return (
      <div className="module-box"><span className="label">Valutakurs</span>
        <h2 className="white">1 {this.state.currencyData.base}</h2>
        <p className="white font-fjalla" style={fontSize}>{this.state.currencyData.rates.SEK} <span className="orange">SEK</span></p>
        {this.refreshBtn()}
        <p className="bottomData uppercase">Uppdaterad: {this.state.currencyData.date}<br />
          timestamp: {this.state.currencyData.timestamp}
        </p>
      </div>
    );
  }
}
  
export default Currency;