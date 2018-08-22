import React from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')
const BusinessModal = ({ isOpen, onRequestClose, onAfterOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterOpen={onAfterOpen}
    >

    </Modal>
  )
}

export default BusinessModal