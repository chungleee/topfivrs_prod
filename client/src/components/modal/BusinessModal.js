import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')
const BusinessModal = ({ isOpen, onRequestClose, onAfterOpen, business }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterOpen={onAfterOpen}
    >
      <p>{business.alias}</p>
    </Modal>
  )
}

export default BusinessModal