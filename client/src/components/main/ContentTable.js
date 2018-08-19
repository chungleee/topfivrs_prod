import React, { Component } from 'react'

class ContentTable extends Component {
  fetchBiz = () => {
    const { businesses } = this.props
    if(businesses.length){
      return businesses.map((biz, idx) => {
        return (
          <tr key={idx}>
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
      </section>
    )
  }
}

export default ContentTable