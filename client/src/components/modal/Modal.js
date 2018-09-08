import React, { Component } from 'react'
import MapContainer from '../google/MapContainer'
import axios from 'axios'

class Modal extends Component {

  handleAddToFav = () => {
    console.log('business_id', this.props.business.id);
    const business_id = this.props.business.id
    axios.post('/api/users/favourite', { business_id })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    const { showModal, handleCloseModal, business } = this.props
    return showModal
      ? (
          <div className='modal is-active'>
            <div className="modal-background" onClick={handleCloseModal}></div>
            <div className="modal-content">
            <div className="box">
                <div className="card">
                  <div className="card-image">
                    <div className="image is-4by3">
                      <img src={business.image_url} alt={business.alias}/>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <div className="title is-4">{business.name}</div>
                        <div className="subtitle is-6">Ratings: {business.rating}</div>
                        <MapContainer 
                          coords={business.coordinates}
                        />
                        <button 
                          className='button'
                          onClick={this.handleAddToFav}
                        >Add to favourites</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              className="modal-close is-large" 
              onClick={handleCloseModal}
            >
            </button>
          </div>
        )
      : null
  }
}

export default Modal