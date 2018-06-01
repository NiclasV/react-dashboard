import React, { Component } from 'react';

class Clock extends Component {

  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    let marginTop = {
      marginTop: "40px",
    }

    return (
      <div className="module-box"><span className="label">Klockan är</span>
        <h2 className="white">{this.state.date.toLocaleTimeString()}</h2>
        <p className="label orange" style={marginTop}>DATUM</p>
        <h2 className="white">{this.state.date.toLocaleDateString()}</h2>
      </div>
    );
  }
}

export default Clock;