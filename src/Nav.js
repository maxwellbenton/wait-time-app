import React, {Component} from 'react'
import { Link } from 'react-router-dom'

export default class NavBar extends Component {
  constructor() {
    super()
    this.navFunction = this.navFunction.bind(this)
  }

  navFunction() {
      var x = this.refs.navBtn
      if (x.className === "topnav") {
          x.className += " responsive";
      } else {
          x.className = "topnav";
      }
  }
render() {
  console.log(this.props)
  return (
    <nav className='topnav' ref={"navBtn"}>
      <div className='container-fluid text-center'>
        <div className="nav" style={{height: '100%'}}>
          
          <Link to="/" onClick={this.props.handleClick}><img height="30" className="img-fluid" src="../pocket_watch_sm.png" alt="mini watch"/></Link>          
          
          <Link to="/map">Map</Link>
          <Link to="/stores">Search</Link>
          {this.props.logInInfo.loggedIn ? <Link to={`/user/${this.props.logInInfo.user.id}`}>{this.props.logInInfo.user.username}</Link> : <Link to="/login">Log In</Link>}
          <a className="icon" onClick={this.navFunction}>&#9776;</a>
        </div>
        
      </div>
    </nav>
  )
}
  
}
