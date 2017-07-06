import React from 'react'
import { Route, Switch, Link } from 'react-router-dom'

import StoreForm from './StoreForm'
import {StoresAdapter} from './adapters/'
import StoreDetail from './StoreDetail'

// Determines Layout of our page
 
export default function StoreList (props) {
    const { stores, createStore, updateStore, deleteStore } = props
    console.log(props.stores)
    return(
      <div>
      <div className='row'>
        <form action="">
          <input type="text" placeholder="Search Stores" onChange={props.handleSearch}/>
        </form>
      </div>
      <div className='row'>
        <div className='col-md-8'>
          <Switch>
            <Route exact path='/stores/new' render={() => <StoreForm onSubmit={createStore} type="Add a Store"/>} />
            <Route exact path='/stores/:id' render={(routerProps) => {
              const id = routerProps.match.params.id
              const store = stores.find( s =>  s.id === parseInt(id, 10))
              
              return <StoreDetail store={store} deleteStore={deleteStore}/>
            }} />
            <Route exact path='/stores/:id/edit' render={(routerProps) => {
              const id = routerProps.match.params.id
              const store = stores.find( s =>  s.id === parseInt(id, 10) )
              if (!store) {
                return null
              }
              return <StoreForm store={store} onSubmit={updateStore} submitText="Update Store"/>
            }} />
          </Switch>
          
        </div>
        <div className='col-md-4'>
          {props.stores.map(store => {
            return <Link to={`/stores/${store.id}`} key={store.id}><div key={store.id}>{store.name} {store.address}</div> </Link>
          })}
        </div>
      </div>
      </div>
    )
  }
