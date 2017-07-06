import React, { Component } from 'react';

export default class Store extends Component {

    handleClick(e) {
        
        this.props.handleClick(this.props.store)
        
    }

    minutes(wt) {
        if(this.props.store.estimated_wait_time.length) {
            return Math.floor(wt / 60000)
        } else {
            return "?"
        }
    }
    seconds(wt) {
        if(this.props.store.estimated_wait_time.length) {
            return ((wt % 60000) / 1000).toFixed(0) 
        } else {
            return "?"
        }
        
    }

    render() {
    var est = (this.props.store.estimated_wait_time.map(wt => wt.wait_time).reduce((a,b) => a + b,0))/this.props.store.estimated_wait_time.length
    return(
        <div className="card" onClick={this.handleClick.bind(this)} >
            <h4>{this.props.store.name}</h4>
            <h6>{this.props.store.address}</h6>
            <h5>Estimated Wait Time: {this.minutes(est)} min, {this.seconds(est)} sec</h5>
            
        </div>
    )
}