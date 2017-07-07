import React, { Component } from 'react';

export default class StandardTime extends Component {

    handleClick(e) {
        
        this.props.handleClick(this.props.data)
        
    }

    minutes(wt) {
        if(this.props.data.estimated_wait_time.length) {
            return Math.floor(wt / 60000)
        } else {
            return "?"
        }
    }
    seconds(wt) {
        if(this.props.data.estimated_wait_time.length) {
            return ((wt % 60000) / 1000).toFixed(0) 
        } else {
            return "?"
        }
        
    }

    render() {
    var est = (this.props.data.estimated_wait_time.map(wt => wt.wait_time).reduce((a,b) => a + b,0))/this.props.data.estimated_wait_time.length
    return(
        <div>
            <h5>Estimated Wait Time: {this.minutes(est)} min, {this.seconds(est)} sec</h5>
            
        </div>
    )
}