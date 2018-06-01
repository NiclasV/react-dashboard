import React, { Component } from 'react';
import './App.css';

import Clock from './components/Clock';
import Timer from './components/Timer';
import Currency from './components/Currency';
import Postit from './components/Postit';
import Weather from './components/Weather';
import Footer from './components/Footer';
import Header from './components/Header';


//Dashboard component including my -dashboard-components
class Dashboard extends Component {
  render() {
    return (
      <div className="modules-flex">
        <Timer />
        <Clock />
        <Currency />
        <Weather />
        <Postit />
      </div>
    );
  }
}

//Main app with all my component
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Dashboard />
        <Footer />
      </div>
    );
  }
}

export default App;
