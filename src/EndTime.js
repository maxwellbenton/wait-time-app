import React, {Component} from 'react'
import Chart from './Chart'
import {StoresAdapter} from './adapters/'

export default class StoresPage extends Component{
    constructor() {
        super()
        this.state = {
            store: null
        }
        this.getStoreInfo = this.getStoreInfo.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.getStoreInfo()
    }

    getStoreInfo() {
        StoresAdapter.show(this.props.store.id)
            .then(store => this.setState({store}))
    }

    handleClick(e) {
        this.props.handleClick(e.target.innerText, this.props.store.id)
    }
    
    render() {
        return (
            <div>
                <div>
                    {this.state.store !== null ? <Chart data={this.state.store} /> : "Loading Chart..."}
                </div>
                <div className="storesPage text-center">
                    <div className="endData"> Thank you!  Please choose a feedback option to submit your wait time.</div>
                    <div className="endFeedback">
                        {feedbackOptions.map((comment) => <button key={comment.id} onClick={this.handleClick}><div className="storeButton">{comment.content}</div></button> )}
                    </div>
                    
                    
                </div>
            </div>            
        )
    }
    
}

const feedbackOptions = [
            {id: 1, content: "No feedback"},
            {id: 2, content: "The line was too long"},
            {id: 3, content: "The line was okay"},
            {id: 4, content: "The line was short"},
            {id: 5, content: "No line!"},
            {id: 6, content: "The line was long, but moved quickly"},
            {id: 7, content: "The line was short, but moved slowly"}
        ]