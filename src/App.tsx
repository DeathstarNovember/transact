import { AppState, Data } from './types'
import { Layout, Transactions } from './components'

import Login from './auth/Login'
import React from 'react'
import { getCurrentUser } from './data'
import { localAuth } from './auth'

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
    this.signOut = this.signOut.bind(this)
  }

  signOut() {
    this.setState(initialState)
  }

  async loadData() {
    const currentUser = getCurrentUser()

    if (!currentUser?.username) {
      this.setState(initialState)
    } else {
      const data: Data[] = await fetch(
        `https://transact-example.herokuapp.com?username=${currentUser?.username}`,
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json().then((jsonData: Data[]) => {
              return jsonData
            })
          } else if (response.status === 500) {
            console.log('status 500')
            return [] as Data[]
          } else {
            return [] as Data[]
          }
        })
        .catch((e) => {
          console.log(e)
          return [] as Data[]
        })

      const filteredData = data.filter((data) => {
        return data.Status === 'COMPROMISED' || data.Status === 'FRAUD'
      })

      const sortedData = filteredData.sort((a, b) => {
        return a.Date >= b.Date ? -1 : 1
      })

      this.setState({
        ...this.state,
        loggedIn: true,
        data: sortedData,
      })
    }
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
          <button onClick={this.signOut}>Log Out</button>
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
