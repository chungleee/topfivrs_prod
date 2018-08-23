import React, { Component } from 'react'

class Modal extends Component {
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
                    <div className="image is-square">
                      <img src={business.image_url} alt={business.alias}/>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="media">
                      <div className="media-content">
                        <div className="title is-4">{business.name}</div>
                        <div className="subtitle is-6">Ratings: {business.rating}</div>
                      </div>
                    </div>
                    <div className="content">
                      this is where i'll put google maps API
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