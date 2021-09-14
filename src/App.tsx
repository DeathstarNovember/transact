import React from 'react'
import Login from './auth/Login'
import { Layout, Transactions } from './components'
import { sampleData } from './data'
// API URL
// `https://transact-example.herokuapp.com?username=${username}`

type AppState = {
  loading: boolean
  data: any
  loggedIn: boolean
}
const initialState: AppState = {
  loading: true,
  data: undefined,
  loggedIn: false,
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

  loadData(username: string) {
    this.setState({
      ...this.state,
      loggedIn: true,
      data: sampleData,
    })
  }

  render() {
    console.log({ data: this.state.data })
    if (this.state.loggedIn && this.state.data) {
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
