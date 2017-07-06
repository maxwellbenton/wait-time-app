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
      <form onSubmit={this.handleSubmit}>
        <table>
          <tr>
            <td><label>Store Name</label></td>
            <td><input type='text' value={this.state.storeName} name="storeName" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td><label>Address</label></td>
            <td><input type='text' value={this.state.address} name="address" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td><label>Company</label></td>
            <td><input type='text' value={this.state.company} name="company" onChange={this.handleChange}/></td>
          </tr>
          <tr>
            <td><input type="submit" /></td>
          </tr>
        </table>
        
      </form>
    )
  }
}

export default withRouter(StoreForm)