import React, { Component } from 'react';
import Timer from './Timer'


class App extends Component {
  

  render() {
    //<TimingPage store={this.state.curStore} onClick={this.timeWait} timeInfo={this.state}/>
    return (
      <div className="timePage text-center" onClick={this.props.timerStarted ? this.props.handleClick : null}>
          <img height="280" className="img-fluid" src="../pocket_watch_1.png" alt="pocket watch"/>
          <Timer timerStarted={this.props.timerStarted}/>
      </div>
    );
  }
}

export default App;