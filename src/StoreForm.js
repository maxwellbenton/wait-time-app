import React, { Component } from 'react'
import {StoresAdapter} from '../src/adapters'
import { withRouter } from 'react-router-dom'



class StoreForm extends Component {

  constructor(){
    super()
    this.state = {
      storeName: '',
      address: '',
      company: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    StoresAdapter.createStore(e.target.storeName.value, e.target.address.value, e.target.company.value)
        .then(console.log)
    this.setState({
      storeName: '',
      address: '',
      company: ''
    }) 
    this.props.history.push('/stores')
  }

  render(){
    console.log(this.props)
    return (
      <div className="store-form">
        <form  className="store-form" onSubmit={this.handleSubmit}>
          
            
              <div className="text-center"><input type='text' className="form-input"placeholder="Store Name" value={this.state.storeName} name="storeName" onChange={this.handleChange}/></div>
            
            
              <div className="text-center"><input type='text' className="form-input"placeholder="Address" value={this.state.address} name="address" onChange={this.handleChange}/></div>
            
            
              <div className="text-center"><input type='text' className="form-input"placeholder="Company" value={this.state.company} name="company" onChange={this.handleChange}/></div>
            
            
              <div className="text-center store-form"><input type="submit" /></div>
            
          
          
        </form>
      </div>
    )
  }
}

export default withRouter(StoreForm)