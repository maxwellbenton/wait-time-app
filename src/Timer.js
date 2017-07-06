import React, { Component } from 'react';
import StopWatch from './StopWatch'

export default class Timer extends Component {

render() {
    var stopWatch = () => {
        if(!this.props.timerStarted) {
            return <div className="logo">WAIT TIME</div>
            
        } else {
            return <StopWatch />
        } 
    }
    //<div onClick={this.handleClick}>{this.props.timeInfo.timerStarted ? "Click to Stop" : "Click to Start"}</div>
    return(
        <div className="timer">
            {stopWatch()}
            
        </div>
    )
}

}