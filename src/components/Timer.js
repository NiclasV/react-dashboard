import React, { Component } from 'react';



class Timer extends Component {
  constructor() {
    super();
    this.state = { time: {}, seconds: 300 };
    this.timer = "stopped";
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  secondsToTime(secs){
    //Some math for converting the seconds to hours/minutes/seconds
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar, timer: "stopped" });
  }

  startTimer() {
    if (this.timer === "stopped") {
      this.timer = setInterval(this.countDown, 1000);
    }
    this.setState({
      timer: "started"
    })
  }

  stopTimer() {
    clearInterval(this.timer)
    this.setState({
      timer: "stopped"
    })
  }

  countDown() { 
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    // Check if we're at zero.
    if (seconds === 0) { 
      clearInterval(this.timer);
    }
  }

  timerButtons() {
    //trying to make the buttons to switch depending on if we've stopped or started the timer, doesnt work yet!
    if(this.timer === "stopped") {
      return (
        <button onClick={this.startTimer} className="btn btn-block btn-success uppercase">Start</button>
      );
    }
      return (
        <button className="btn btn-block btn-danger uppercase" onClick={this.stopTimer}>Stoppa</button>
    );
}

  render() {
    return(
      <div className="module-box">
      <span className="label">5-Minuters Timer</span>
        <h2 className="white">{this.state.time.m}min {this.state.time.s}sek</h2><br /><br />
        
        {this.timerButtons()}
      </div>
    );
  }

}


export default Timer;