import React, { Component } from 'react';

export default class NotFound extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return(
      <div className="notfound-container">
        <h1>404</h1>
        <h2>:(</h2>
      </div>
    )
  }
}
