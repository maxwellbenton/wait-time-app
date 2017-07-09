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
  return (
    <nav className='topnav' ref={"navBtn"}>
      <div className='container-fluid text-center'>
        <div className="nav" style={{height: '100%'}}>
          
          <Link to="/" onClick={this.props.handleClick}><img height="30" className="img-fluid" src="../pocket_watch_sm.png" alt="watch icon"/></Link>          
          
          <Link to="/map"><img height="30" className="img-fluid" src="../maps-icon.png" alt="map icon"/></Link>
          <Link to="/stores"><img height="30" className="img-fluid" src="../search-icon.png" alt="map icon"/></Link>
          {this.props.logInInfo.loggedIn ? <Link to={`/user/${this.props.logInInfo.user.id}`}><img height="30" className="img-fluid" src="../user-icon.png" alt="map icon"/><span className="userName">{this.props.logInInfo.user.username}</span></Link> : <Link to="/login">Log In</Link>}
          <a className="icon" onClick={this.navFunction}>&#9776;</a>
        </div>
        
      </div>
    </nav>
  )
}
  
}
