import { AppState, Data } from './types'
import { Layout, Transactions } from './components'
import React, { useEffect, useState } from 'react'

import Login from './auth/Login'
import { getCurrentUser, setLocalStorage } from './data'
import { localAuth } from './auth'

// API URL
// `https://transact-example.herokuapp.com`

const initialState = {
  data: undefined, // <== the data array
  loggedIn: false,
  authError: false,
}

const App: React.FC<{}> = () => {
  const [state, setState] = useState<AppState>(initialState)

  const signOut = () => {
    setState(initialState)
    setLocalStorage()
  }

  const dismissItem = (id: string) => {
//-- 1. produce new state
    const newState = {...state, data: state?.data?.filter((item) => item.Id !== id)}

    setState(newState)
  }

  const loadData = async () => {
    const currentUser = getCurrentUser()

    if (currentUser) {
      const data: Data[] = await fetch(
        `https://transact-example.herokuapp.com?username=${currentUser.username}`,
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

      setState({
        ...state,
        loggedIn: true,
        data: sortedData,
      })
    } else {
      setState(initialState)
    }
  }

  useEffect(() => {
    ;(async () => {
      if (!state.authError) {
        if (await localAuth(loadData)) {
          setState({ ...state, loggedIn: true })
        } else {
          setState({ ...initialState, authError: true })
        }
      }
    })()
  }, [])

  if (state.loggedIn) {
    return (
      <Layout>
        <button onClick={signOut}>Log Out</button>
        <h1>Recent Transactions</h1>
        <Transactions dismissItem={dismissItem} transactions={state.data} />
      </Layout>
    );
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
