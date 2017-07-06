import React, {Component} from 'react'
import {UserAdapter} from './adapters/'
import Chart from './Chart'
import { withRouter } from 'react-router-dom'

class UserPage extends Component{
  constructor() {
    super()
    this.state = {
      user: null
    }
    this.totalWait = this.totalWait.bind(this)
  }

  totalWait() {
    if(this.state.user !== null) {
      let total = this.state.user.wait_times.reduce((acc, wt) => acc + wt.wait_time, 0)
      return total/1000
    }
  }

  componentWillMount() {

    if(localStorage.getItem("user_id") === null) {
      this.props.history.push('/login')
    }
  }

  displayChart() {
      if(this.state.user.wait_times.length > 0) {
          return(
              <Chart data={this.state.user}/>
          )
      } else {
          return "No data available"
      }
  }
  
  render() {
    if(this.state.user) {
      UserAdapter.userData(localStorage.getItem("user_id"))
        .then(user => {
          this.setState({
            user: user
          })
        })
    }
    
    
    return (
      <div>
        <div className="text-center"><img className="img-circle" src={`/photos/${Math.floor(Math.random() * (11 - 1)) + 1}.jpg`} alt="user-time"/></div>
        <h3 className="text-center">{this.state.user !== null ? this.state.user.username : null}</h3>
        <div>{this.state.user !== null ? <Chart data={this.state.user} />  : null}</div>
        <div>Lines Timed: {this.state.user !== null ? this.state.user.wait_times.length  : null}</div>
        <div>Total Time Spent in Line: {this.totalWait()} seconds</div>
        <div>User since {this.state.user !== null ? this.state.user.created_at.split('T')[0] : null}</div>
        
        <button onClick={this.props.onLogout}>Log Out</button>
      </div>
    )
  }
  
}

export default withRouter(UserPage)