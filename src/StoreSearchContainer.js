import React, {Component} from 'react'
import {StoresAdapter} from './adapters/'
import { Route, Switch, Link } from 'react-router-dom'

import StoreForm from './StoreForm'
import StoreDetail from './StoreDetail'


export default class StoresSearchContainer extends Component{
    constructor() {
        super()
        this.state = {
            stores: [],
            filter: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.getStores = this.getStores.bind(this)
        this.filterStores = this.filterStores.bind(this)
        this.createStore = this.createStore.bind(this)
        this.deleteStore = this.deleteStore.bind(this)
        this.updateStore = this.updateStore.bind(this)
    }

    componentDidMount(){
        this.getStores()
    }

    getStores() {
      StoresAdapter.all()
        .then( data => this.setState({ stores: data}) )
    }

    render(){
        var storeList = this.state.stores.filter(store => store.name.includes(this.state.filter) || store.address.includes(this.state.filter)).map(store => <Link to={`stores/${store.id}`} key={store.id}><div key={store.id}>{store.name}</div><div>{store.address}</div></Link>)
        return(
          <div>
            <Switch>
              <Route exact path='/stores' render={() => {
                return  <div>
                          <div className='row'>
                            <form action="">
                              <input type="text" placeholder="Search Stores" onChange={this.filterStores}/>
                            </form>
                            <Link to='/stores/new'>Add Store</Link>
                          </div>
                          <div className='col-md-4'>
                            {storeList}
                          </div>
                        </div>
              }} />
              <Route exact path='/stores/new' render={() => <StoreForm onSubmit={this.createStore} type="Add a Store"/>} />
              <Route exact path='/stores/:id' render={(routerProps) => {
                const id = routerProps.match.params.id
                const store = this.state.stores.find( s =>  s.id === parseInt(id, 10))
                return <StoreDetail store={store} deleteStore={this.deleteStore}/>
              }} />
              <Route exact path='/stores/:id/edit' render={(routerProps) => {
                const id = routerProps.match.params.id
                const store = this.stores.find( s =>  s.id === parseInt(id, 10) )
                if (!store) {
                  return null
                }
                return <StoreForm store={store} onSubmit={this.updateStore} submitText="Update Store"/>
              }} />
            </Switch>
          </div>
        )   
    }

    filterStores(e) {
      this.setState({filter: e.target.value})
    }

    createStore(store){
        StoresAdapter.create(store)
        .then(store => this.setState((previousState) => {
            return {
            stores: [...previousState.stores, store]
            }
        })
        )
    }

    deleteStore(id){
      StoresAdapter.destroy(id)
        .then( () => {
          this.setState( previousState => {
            return {
              stores: previousState.stores.filter( store => store.id !== id )
            }
          })
          this.props.history.push("/stores")
        })
    }

    updateStore(store){
      StoresAdapter.update(store).then(() => {
        this.setState(function(previousState){
          return {
            stores: previousState.stores.map(function(s){
              if (s.id !== store.id ) {
                return s
              } else {
                return store
              }
            })
          }
        })
        this.props.history.push(`/stores/${store.id}`)
      })
    }

    handleChange(e) {
        this.props.onChange(e)
    }
    
}


  

  

  


