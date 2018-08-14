import React, { Component } from 'react'
import './Main.css'
import axios from 'axios'
import ContentTable from './ContentTable'

class SearchBar extends Component {
  constructor() {
    super()
    this.state = {
      location: '',
      businesses: []
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
          <div className="container">
            <div className="field">
              <input 
                onChange={this.handleOnChange}
                className="input" 
                type="text" 
                placeholder="Type in your current address" 
                name="location" 
              />
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