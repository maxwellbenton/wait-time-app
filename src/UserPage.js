import React, {Component} from 'react'
import Chart from './Chart'
import LoadingScreen from './LoadingScreen'
import { withRouter } from 'react-router-dom'

class UserPage extends Component{
  constructor() {
    super()
    this.state = {
      user: null,
      loading: true
    }
    this.totalWait = this.totalWait.bind(this)
  }

  totalWait() {
    if(this.props.user !== null) {
      let total = this.props.user.wait_times.reduce((acc, wt) => acc + wt.wait_time, 0)
      return total/1000
    }
  }

  componentWillMount() {
    if(localStorage.getItem("user_id") === null || localStorage.getItem("user_id") === 'undefined'|| this.props.user === null || this.props.user === 'undefined') {
      this.props.history.push('/')
    } else {
      this.setState({
      loading: false
    })
    }
    
  }

  displayChart() {
      if(this.props.user.wait_times.length > 0) {
          return(
              <Chart data={this.props.user}/>
          )
      } else {
          return "No data available"
      }
  }
  
  render() {
    if(this.state.loading) {
      return <LoadingScreen />
    } else {

      return (
        <div>
          <div className="text-center"><img className="img-circle" src={`/photos/${Math.floor(Math.random() * (11 - 1)) + 1}.jpg`} alt="user-time"/></div>
          <h3 className="text-center">{this.props.user.username}</h3>
          <div><Chart data={this.props.user} /></div>
          <div>Lines Timed: {this.props.user.wait_times.length > 0 ? this.props.user.wait_times.length : 'No lines have been timed by this user'}</div>
          <div>Total Time Spent in Line: {this.totalWait()} seconds</div>
          <div>User since {this.props.user.created_at.split('T')[0]}</div>
          
          <button onClick={this.props.onLogout}>Log Out</button>
        </div>
      )
    }
    
  }
  
}

export default withRouter(UserPage)