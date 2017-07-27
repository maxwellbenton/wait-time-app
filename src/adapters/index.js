const baseUrl = 'https://localhost:3000'

export class AuthAdapter {
  static login(loginParams){
    return fetch(`${baseURL}/api/v1/auth`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json() )
  }
  static currentUser(){
    return fetch(`${baseUrl}/api/v1/current_user`, {
        headers: headers(),
    }).then(res => res.json() )
  }  
}


export class UserAdapter {
  static userData(userParams){
    return fetch(`${baseUrl}/api/v1/user_data`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(userParams)
    }).then(res => res.json() )
  }

  static createUser(username, password){
    return fetch(`${baseUrl}/api/v1/create_user`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        user: {
            username: username,
            password: password
        }
      })
    })
      .then(response => response.json() )
  }
}


export class WaitTimesAdapter  {
  static all(){
    return fetch(`${baseUrl}/api/v1/wait_times`, {
      headers: headers()
    })
      .then( res => res.json() )
  }

  static create(waitTime, selectedStore, user_id){
    return fetch(`${baseUrl}/api/v1/wait_times`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        wait_time: {
            wait_time: waitTime,
            store_id: selectedStore.id,
            user_id: user_id
        }
      })
    }).then(response => response.json() )
  }

  
}

export class StoresAdapter  {
  static all(){
    return fetch(`${baseUrl}/api/v1/all`)
      .then(response => response.json() )
  }

  static show(id){
    return fetch(`${baseUrl}/api/v1/show`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
            store_id: {
              id: id
            }
        })
    })
      .then(response => response.json() )
  }
  static getLocalStores(lat, lng){
    return fetch(`${baseUrl}/api/v1/searchStores`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
            location: {
                latitude: lat,
                longitude: lng
            }
        })
    })
      .then(response => response.json() )
  }

  static wideSearch(lat, lng){
    return fetch(`${baseUrl}/api/v1/wideSearchStores`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        location: {
            latitude: lat,
            longitude: lng
        }
      })
    })
      .then(response => response.json() )
  }

  static createStore(storeName, address, company){
    return fetch(`${baseUrl}/api/v1/createStore`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        store: {
            name: storeName,
            address: address,
            company: company
        }
      })
    })
      .then(response => response.json() )
  }

}
export class FeedbackAdapter  {
  

  static create(feedback, store_id, user_id, wait_time){
    return fetch(`${baseUrl}/api/v1/create_feedback`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({
            comment: {
              feedback: feedback,
              store_id: store_id,
              user_id: user_id,
              wait_time: wait_time
            }
        })
    })
      .then(response => response.json() )
  }
}

function headers() {
    return {
        'content-type': 'application/json',
        'accept': 'application/json',
        'Authorization': localStorage.getItem('user_id')
    }
}