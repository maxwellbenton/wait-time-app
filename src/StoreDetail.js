import React, { Component } from 'react';
import Chart from './Chart'
import {StoresAdapter} from './adapters/'


export default class StoreDetail extends Component {
        constructor() {
            super()
            this.state = {
                store: null,
                hoursData: null
            }
        }
        
        displayChart() {
            if(this.state.store.wait_times !== 'undefined') {
                return(
                    <Chart data={this.state.store}/>
                )
            } else {
                return "No data available"
            }
        }
        getStoreInfo() {
            
            StoresAdapter.show(this._reactInternalInstance._context.router.route.match.params.id)
                .then(store => this.setState({store}))
        }

        render () {
            console.log(this.state.store)
            if(this.state.store === null) {
                {this.getStoreInfo()}
                return <div>Loading store data...</div>
            } else {
                return(
                    <div>
                        <h3>{this.state.store !== null ? this.state.store.name : null}</h3>
                        <h4>{this.state.store !== null ? this.state.store.address : null}</h4>
                        {this.displayChart()}
                        <div>
                            Lines Timed: {this.state.store !== null ? this.state.store.wait_times.length : null}
                        </div>
                        <div>
                            Total Average Wait Time: {this.state.store !== null ? this.state.store.wait_times.map(wt => wt.wait_time/1000).reduce((a,b) => a+b)/this.state.store.wait_times.length : null}
                        </div>
                    </div>
                )
            }
        }
}