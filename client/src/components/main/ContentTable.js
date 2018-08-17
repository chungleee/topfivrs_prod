import React, { Component } from 'react'
import BizModal from '../modal/BizModal';

class ContentTable extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false
    }
  }

  openModal = () => {
    this.setState({
      isOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      isOpen: false
    })
  }

  fetchBiz = () => {
    const { businesses } = this.props
    if(businesses.length){
      return businesses.map((biz, idx) => {
        return (
          <tr key={idx} onClick={this.openModal} >
            <th>{idx+1}</th>
            <td>{biz.name}</td>
            <td>{biz.location.address1}</td>
          </tr>
        )
      })
    }
  }
  render() {
    return (
      <section className="section">
        <div className="container">
          <table className="table is-hoverable is-margin-auto">
            <tbody>
              {this.fetchBiz()}
            </tbody>
          </table>
        </div>
        <BizModal 
          businesses={this.props.businesses}
          isOpen={this.state.isOpen} 
          closeModal={this.closeModal}
        />
      </section>
    )
  }
}

export default ContentTable