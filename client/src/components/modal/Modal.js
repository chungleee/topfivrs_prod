import React, { Component } from 'react'

class Modal extends Component {
  render() {
    const { showModal, handleCloseModal } = this.props
    return showModal
      ? (
          <div className='modal is-active'>
            <div 
              className="modal-background"
              onClick={handleCloseModal}
            >
            </div>

            <div className="modal-content">
              <div className="media">
                <div className="media-content">
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