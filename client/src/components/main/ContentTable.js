import React, { Component } from 'react'
import BusinessModal from '../modal/BusinessModal';
import axios from 'axios'

class ContentTable extends Component {
  state = {
    showModal: false,
    business_alias: '',
    business: {}
  }

  // handleOpenModal = () => {
  //   this.setState({ showModal: true })
  // }

  handleCloseModal = () => {
    this.setState({ 
      showModal: false,
      business_alias: ''
    })
  }

  handleGetBusinessId = (e) => {
    this.setState({
      business_alias: e.target.getAttribute('biz-alias'),
      showModal: true
    })
  }

  handleLoadBusiness = () => {
    const alias = this.state.business_alias
    axios.post('/api/yelp/business', {alias})
      .then((res) => {
        this.setState({
          business: res.data
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  fetchBiz = () => {
    const { businesses } = this.props
    if(businesses.length){
      return businesses.map((biz, idx) => {
        return (
          <tr key={idx}>
            <th>{idx+1}</th>
            <td
              onClick={this.handleGetBusinessId}
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
        <section className="section">
          <div className="container">
            <table className="table is-hoverable is-margin-auto">
              <tbody>
                {this.fetchBiz()}
              </tbody>
            </table>
          </div>
        </section>
        <BusinessModal 
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          onAfterOpen={this.handleLoadBusiness}
          business={this.state.business}
        />
      </div>
    )
  }
}

export default ContentTable