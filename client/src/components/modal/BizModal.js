import React from 'react'
import Modal from 'react-modal'

const BizModal = (props) => {
  Modal.setAppElement('#root')
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      onAfterOpen={() => {
        console.log(props);
      }}
    >

    </Modal>
  )
}

export default BizModal