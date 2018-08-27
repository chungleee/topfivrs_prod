import React, { Component } from 'react'
import './Main.css'
import axios from 'axios'
import ContentTable from './ContentTable'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      location: '',
      businesses: [],
      geolocation: true
    }
  }

  componentDidMount() {
    this.geolocationIsValid()
  }
  
  geolocationIsValid = () => {
    if(navigator.geolocation) {
      this.setState({ geolocation: false })
    }
  }

  handleGeolocation = () => {
    // success cb
    const successCb = (position) => {
      const coords = position.coords
      const latitude = coords.latitude
      const longitude = coords.longitude
      const searchbar = document.getElementById('searchbar')

      searchbar.value = `${latitude}, ${longitude}`
      this.setState({ location: searchbar.value })
    }

    // error cb
    const errorCb = (error) => {
      console.log(error.message);
    }

    if(!this.state.geolocation) {
      navigator
        .geolocation
        .getCurrentPosition(successCb, errorCb)
    }
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSubmit = (e) => {
    const { location } = this.state
    if(e.target.name) {
      axios.post(`/api/yelp/${e.target.name}`, {location})
        .then((response) => {
          // console.log(response);
          const { businesses } = response.data
          this.setState({
            businesses
          })
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  render() {
    return (
      <div>
        {/* IMAGE HERO */}
        <div className="hero is-medium is-relative">
          <div className="is-overlay img"></div>
          <div className="hero-body"></div>
        </div>

        {/* SEARCH BAR + BUTTONS */}
        <section className="section">
          <div className="container" style={{width: '800px'}}>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input 
                  id='searchbar'
                  onChange={this.handleOnChange}
                  className="input" 
                  type="text" 
                  placeholder="Type in your current address" 
                  name="location" 
                />
              </div>
              <div className="control">
                <a 
                  onClick={this.handleGeolocation}
                  className="button"
                  disabled={this.state.geolocation}
                >
                  <span className="icon is-small">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                </a>
              </div>
            </div>
            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <button onClick={this.handleOnSubmit} name='restaurant' className="button">Restaurants</button>
              </div>
              <div className="control">
                <button onClick={this.handleOnSubmit} name='bar' className="button">Bars</button>
              </div>
              <div className="control">
                <button onClick={this.handleOnSubmit} name='cafe' className="button">Cafes</button>
              </div>
            </div>
          </div>
        </section>

        {/* ContentTable Component - todo: pass component state to ContentTable props */}
        <ContentTable businesses={this.state.businesses}/>
      </div>
    )
  }
}

export default SearchBar