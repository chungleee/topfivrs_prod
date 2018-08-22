import React from 'react'
import Modal from 'react-modal'
import './styles.css'

Modal.setAppElement('#root')
const BusinessModal = ({ isOpen, onRequestClose, onAfterOpen, business }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterOpen={onAfterOpen}
    >
      <div className="media">
        <div className="media-left">
          <p className="image is-256x256">
            <img src={business.image_url} alt={business.alias} />
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default BusinessModal