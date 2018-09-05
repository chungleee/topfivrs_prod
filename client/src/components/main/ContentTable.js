import React, { Component } from 'react'
import axios from 'axios'
import Modal from '../modal/Modal';

class ContentTable extends Component {
  state = {
    showModal: false,
    business: {}
  }

  handleCloseModal = () => {
    this.setState({ 
      showModal: false,
      business: {}
    })
  }

  handleOpenModal = () => {
    this.setState({
      showModal: true
    })
  }

  handleLoadBusiness = (e) => {
    const alias = e.target.getAttribute('biz-alias')
    axios.post('/api/yelp/business', { alias})
      .then((res) => {
        this.setState({
          business: res.data
        })
      })
      .catch((err) => {
        console.log(err.response);
      })
    if(this.state.business) {
      this.handleOpenModal()
    }
  }

  fetchBiz = () => {
    const { businesses } = this.props
    if(businesses.length){
      return businesses.map((biz, idx) => {
        return (
          <tr 
            key={idx}
            onClick={this.handleLoadBusiness}
          >
            <th>{idx+1}</th>
            <td
              biz-alias={biz.alias}
            >{biz.name}</td>
            <td>{biz.location.address1}</td>
          </tr>
        )
      })
    }
  }

  render() {
    return (
      <div>
        <section className="section" >
          <div className="container" style={{height: '200px'}}>
            <table className="table is-hoverable is-margin-auto">
              <tbody>
                {this.fetchBiz()}
              </tbody>
            </table>
          </div>
        </section>
        <Modal
          showModal={this.state.showModal}
          handleCloseModal={this.handleCloseModal}
          business={this.state.business}
        />
      </div>
    )
  }
}

export default ContentTable