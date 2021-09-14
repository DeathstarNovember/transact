import React, { Component } from 'react'

export class Layout extends Component {
  props: any
  render() {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {this.props.children}
      </div>
    )
  }
}
