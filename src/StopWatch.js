import React, { Component } from 'react';

var minutes = 0;
var seconds = 0; 
var tens = 0; 
var newTens = "00"
var newSeconds = "00"
var newMinutes = "00"
var newHour = "00"
var interval

export default class StopWatch extends Component {
    constructor() {
        super()
        
        this.state = {
            tens: 0,
            seconds: 0,
            minutes: 0,
            hours: 0
        }
        this.incrementTimer = this.incrementTimer.bind(this)
        
        interval = setInterval(this.incrementTimer,10)
    }

    componentWillUnmount() {
        clearInterval(interval)
        minutes = 0;
        seconds = 0; 
        tens = 0; 
        newTens = "00"
        newSeconds = "00"
        newMinutes = "00"
        newHour = "00"
        this.setState = {
            tens: 0,
            seconds: 0,
            minutes: 0,
            hours: 0
        }
    }
    incrementTimer() {
        tens++

        if(tens < 9){
            newTens = "0" + tens;
        }
        
        if (tens > 9){
            newTens = tens;
        } 
        if (tens > 99) {
            
            seconds++;
            newSeconds = "0" + seconds;
            tens = 0;
            newTens = "0" + 0;
        }
        
        if (seconds > 9){
            newSeconds = seconds;
        }
        if (seconds > 59) {
            minutes++;
            newMinutes = "0" + minutes;
            seconds = 0;
            newSeconds = "0" + 0;
        }
        if (minutes > 9) {
            newMinutes = minutes;
        }
        
        this.setState({
            tens: newTens,
            seconds: newSeconds,
            minutes: newMinutes,
            hours: newHour
            
        })
        

    }

    handleClick() {
        clearInterval(interval)
        newTens = "00"
        newSeconds = "00"
        newMinutes = "00"
        newHour = "00"
        this.setState({
            tens: 0,
            seconds: 0,
            minutes: 0,
            hours: 0
        })
        this.props.onClick()
    }
    render() {
        return (
            <div className="logo"><span className="hour">{this.state.hours}</span>:<span className="min">{this.state.minutes}</span>:<span className="sec">{this.state.seconds}</span></div>
        ) 
    }
}
