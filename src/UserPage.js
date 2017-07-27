import React, {Component} from 'react'
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
    if(this.props.user !== null) {
      let total = this.props.user.wait_times.reduce((acc, wt) => acc + wt.wait_time, 0)
      return total/1000
    }
  }

  componentWillMount() {

    if(localStorage.getItem("user_id") === null) {
      this.props.history.push('/login')
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
  
    if(this.props.user === null) {
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
        <h3 className="text-center">{this.props.user !== null ? this.props.user.username : null}</h3>
        <div>{this.props.user !== null ? <Chart data={this.props.user} />  : null}</div>
        <div>Lines Timed: {this.props.user !== null ? this.props.user.wait_times.length  : null}</div>
        <div>Total Time Spent in Line: {this.totalWait()} seconds</div>
        <div>User since {this.props.user !== null ? this.props.user.created_at.split('T')[0] : null}</div>
        
        <button onClick={this.props.onLogout}>Log Out</button>
      </div>
    )
  }
  
}

export default withRouter(UserPage)