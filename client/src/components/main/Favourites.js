import React, { Component } from 'react'
import axios from 'axios'
import ContentTable from './ContentTable';

class Favourites extends Component {
  state = {
    business_alias: [],
    isLoading: null
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.loadFavourites()
      .then((response) => {
        this.setState({ 
          business_alias: response, 
          isLoading: false 
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  loadFavourites = () => {
    return new Promise((resolve, reject) => {
      axios
        .get('/api/users/favourite')
        .then((response) => {
          // resolve(response.data.favourites)
          resolve(this.getFavourites(response.data.favourites))
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  getFavourites = (arrayOfFavourites) => {
    return Promise.all(arrayOfFavourites.map((favourite) => {
      return axios
        .post('/api/yelp/business', { alias: favourite })
        .then((response) => {
          return response.data
        })
    }))
  }

  render() {
    const { isLoading, business_alias } = this.state
    return (
      <div>
      {isLoading && 
        <div className="section">
          <div className="container is-flex" style={{ justifyContent: 'center', height: '200px', alignItems: 'center' }} >
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
      }
      {!isLoading && <ContentTable businesses={business_alias} />}
      </div>
    )
  }
}

export default Favourites