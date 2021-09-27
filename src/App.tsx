import { Layout, Transactions } from './components'
import React, { useEffect, useState } from 'react'

import { AppState } from './types'
import Login from './auth/Login'
import { localAuth } from './auth'
import { sampleData } from './data'

// API URL
// `https://transact-example.herokuapp.com`

const initialState = {
  data: undefined,
  loggedIn: false,
  authError: false,
}

const App: React.FC<{}> = () => {
  const [state, setState] = useState<AppState>(initialState)

  const signOut = () => {
    setState(initialState)
  }

  const loadData = () => {
    setState({
      ...state,
      loggedIn: true,
      data: sampleData,
    })
  }

  useEffect(() => {
    ;(async () => {
      if (!state.authError) {
        if (await localAuth(loadData)) {
          setState({ ...state, loggedIn: true })
        } else {
          setState({ ...state, authError: true })
        }
      }
    })()
  }, [state.authError])

  if (state.loggedIn) {
    return (
      <Layout>
        <button onClick={signOut}>Log Out</button>
        <h1>Recent Transactions</h1>
        <Transactions transactions={state.data} />
      </Layout>
    )
  } else {
    return (
      <Layout>
        <h1>Check Recent Transactions</h1>
        <Login onSignIn={loadData} />
      </Layout>
    )
  }
}

export default App
