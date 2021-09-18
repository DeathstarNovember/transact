import React from 'react'

import { localAuth } from './auth'
import Login from './auth/Login'
import { Layout, Transactions } from './components'
import { sampleData } from './data'
import { AppState } from './types'

// API URL
// `https://transact-example.herokuapp.com`

const initialState = {
  data: undefined,
  loggedIn: false,
  authError: false,
}

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props)
    this.state = initialState
    this.loadData = this.loadData.bind(this)
  }

  signOut() {
    this.setState(initialState)
  }

  loadData() {
    this.setState({
      ...this.state,
      loggedIn: true,
      data: sampleData,
    })
  }

  async componentWillMount() {
    if (!this.state.authError) {
      if (await localAuth(this.loadData)) {
        this.setState({ ...this.state, loggedIn: true })
      } else {
        this.setState({ ...this.state, authError: true })
      }
    }
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <Layout>
          <h1>Recent Transactions</h1>
          <Transactions transactions={this.state.data} />
        </Layout>
      )
    } else {
      return (
        <Layout>
          <h1>Check Recent Transactions</h1>
          <Login onSignIn={this.loadData} />
        </Layout>
      )
    }
  }
}

export default App
