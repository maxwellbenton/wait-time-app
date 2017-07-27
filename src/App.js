import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom'

import Nav from './Nav'
import TimePage from './TimePage'
import EndTime from './EndTime'
import StoresPage from './StoresPage'
import StoreSearchContainer from './StoreSearchContainer'
import Footer from './Footer'
import Map from './Map'
import About from './About'
import Contact from './Contact'
import Login from './Login'
import UserPage from './UserPage'

import {StoresAdapter, AuthAdapter, UserAdapter, FeedbackAdapter} from './adapters/'


class App extends Component {
  constructor() {
    super()
    this.state = {
      timerStarted: 0,
      startTime: null,
      latitude: null,
      longitude: null,
      curLat: null,
      curLong: null,
      selectedStore: null,
      error: null,
      nearbyStores: [],
      waitTime: null,
      mapHeight: 670,
      mapWidth: 375,
      searchTerm: "",
      storeDetail: null,
      pageLoading: true,
      auth: {
        loggedIn: null,
        user: null
      }
      
    };
    this.toggleTimer = this.toggleTimer.bind(this)
    this.getNearbyStores = this.getNearbyStores.bind(this)
    this.getUserLocation = this.getUserLocation.bind(this)
    this.setWaitTime = this.setWaitTime.bind(this)
    this.changeMap = this.changeMap.bind(this)
    this.resetTimeStatus = this.resetTimeStatus.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.logIn = this.logIn.bind(this)
    this.logOut = this.logOut.bind(this)
    this.checkForLogIn = this.checkForLogIn.bind(this)
    this.createUser = this.createUser.bind(this)
    this.submitFeedback = this.submitFeedback.bind(this)
  }

  componentWillMount() {
    this.getCurrentUser()
  }

  render() {
    console.log(this.state.curLat)
    console.log(this.state.curLong)
    console.log(this.state.auth.user)
    return (
      <div className="App container">
        <Nav handleClick={this.resetTimeStatus} logInInfo={this.state.auth}/>
        <Route exact path="/" render={() => {
          if(this.state.pageLoading) {
            return  <div className="loadingScreen text-center">
                      <div className="loadingAnimation mx-auto d-block">
                        <div className="loadingText">
                          Loading...
                        </div>
                      </div>
                    </div>
          } else {
            if(this.state.timerStarted === 2) {
              console.log(this.state.selectedStore)
              return <div className="ending-page">
                      <EndTime store={this.state.selectedStore} handleClick={this.submitFeedback}/>
                    </div>
            } else {
              console.log("timer not activated")
              return  <div>
                        <div className="landing-page"><TimePage timerStarted={this.state.timerStarted} timeInfo={this.state.startTime}/></div>
                        {this.checkForLogIn()}
                      </div>
            }
          }  
        }} />
        <Route exact path="/map" render={() => {
          return  <div className="storemap-page">
                    <Map curState={this.state} mapChange={this.changeMap} nearbyStores={this.state.nearbyStores} getUserLocation={this.getUserLocation}/>
                  </div>
        }} />
        <Route path="/stores" render={() => {
          return  <div className="storedata-page">
                    <StoreSearchContainer getLoc={this.getUserLocation} curState={this.state} onChange={this.handleSearch}/>
                  </div>
        }} />
        <Route exact path="/about" render={() => {
          return  <div className="about-page">
                    <About />
                  </div>
        }} />
        <Route exact path="/contact" render={() => {
          return  <div className="contact-page">
                    <Contact />
                  </div>
        }} />
        <Route exact path="/login" render={() => {
          return  <div className="login-page">
                    <Login onSubmit={this.logIn} onUserCreate={this.createUser}/>
                  </div>
        }} />
        <Route exact path="/user/:id" render={() => {
          
          return  <div className="user-page">
                    <UserPage user={this.state.auth.user} onLogout={this.logOut}/>
                  </div>
                  
        }} />
        <div className="footer">
          <Footer />
        </div>
        
          
      </div>
    );
    
  }

  getCurrentUser() {
    if(localStorage.getItem('user_id') === undefined) {
      this.props.history.push('/login')
    } else {

      fetch(`http://localhost:3000/api/v1/current_user`, {
          headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': localStorage.getItem('user_id')
        },
      }).then(res => res.json() )

      AuthAdapter.currentUser(localStorage.getItem("user_id"))

      .then(user => {
        this.setState({
          auth: {
            loggedIn: true,
            user: user
          }
        })
      })
    } 
    this.getUserLocation()
  }

  getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.getNearbyStores(position.coords.latitude,position.coords.longitude) 
      },
      (error) => this.setState({ error: error.message })
    );
  }  

  getNearbyStores(lat, lng) {
    fetch(`http://localhost:3000/api/v1/searchStores`, {
        method: 'POST',
        headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
        body: JSON.stringify({
            location: {
                latitude: lat,
                longitude: lng
            }
        })
    })
        .then(response => response.json() )
        .then(data => {
          if (this.state.curLat === null) {
            this.setState({
              latitude: lat, 
              longitude: lng,
              curLat: lat,
              curLong: lng,
              error: null,
              nearbyStores: data,
              pageLoading: false
            })
          } else {
            this.setState({
              latitude: lat, 
              longitude: lng,
              error: null,
              nearbyStores: data,
              pageLoading: false
            })
          }
        })
        
  }

  

  toggleTimer(store) {
    console.log(!this.state.timerStarted)
    if(this.state.timerStarted === 0) {
          this.setState({
            timerStarted: 1,
            startTime: performance.now(),
            selectedStore: store,
            
          })
    } else {
      this.setWaitTime(performance.now()-this.state.startTime)
    }
  }

  setWaitTime(waitTime) {
        this.setState({
            timerStarted: 2,
            startTime: null,
            waitTime: waitTime
          })
      //this.getNearbyStores(this.state.latitude, this.state.longitude) 
  }
  
  changeMap(lat, lng) {
    this.getNearbyStores(lat, lng) 
  }

  submitFeedback(feedback, store_id) {
    FeedbackAdapter.create(feedback, store_id, this.state.auth.user.id, this.state.waitTime)
      .then(console.log)
      .then(this.resetTimeStatus())
  }

  resetTimeStatus() {
    this.setState({
      timerStarted: 0,
      selectedStore: null,
      waitTime: null
    })
  }
  
  handleSearch(e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

  checkForLogIn() {
    if(this.state.auth.loggedIn) {
      return <div className="storesPage"><StoresPage initialPosition={{lat:this.state.curLat,long:this.state.curLong}} nearbyStores={this.state.nearbyStores} selectedStore={this.state.selectedStore} timerStarted={this.state.timerStarted} handleClick={this.toggleTimer} /></div>
    } else if (!this.state.auth.loggedIn){
      return <div className="landing-page"><Login onSubmit={this.logIn} onUserCreate={this.createUser}/></div>
    } else {
      return <div><img height="30" className="img-fluid" src="../pocket_watch_sm.png" alt="watch icon"/></div>
    }
  }

  logIn(loginParams) {
    AuthAdapter.login(loginParams)
    .then(user => {
      this.setState({
        auth: {
          loggedIn: true,
          user: user,
          pageLoading: false
        }
      })
      localStorage.setItem("user_id", user.id)

    })
    .then(this.props.history.push('/login'))
  }

  logOut() {
      this.setState({
        auth: {
          loggedIn: false,
          user: null
        }
      })
      localStorage.removeItem('user_id')
      this.props.history.push('/')
    
  }

  createUser(state) {
    UserAdapter.createUser(state.newUsername, state.newPassword)
      .then(user => {
      this.setState({
        auth: {
          loggedIn: true,
          user: user
        }
      })
      localStorage.setItem("user_id", user.id)
    })
  }
  

}

export default withRouter(App);
