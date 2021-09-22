import React from 'react'

import { localAuth } from './auth'
import Login from './auth/Login'
import { Layout, Transactions } from './components'
import { sampleData } from './data'
import { AppState, Data } from './types'

// API URL
// `https://transact-example.herokuapp.com`

const initialState = {
  data: undefined,
  loggedIn: false,
  authError: false,
  userName: undefined,
}

const API_URL = "https://transact-example.herokuapp.com";

class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = initialState;
    this.loadData = this.loadData.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.setState(initialState);
  }

  loadData() {
    const getConfiguredURL = (userName: string) => {
      return `${API_URL}?username=${userName}`; //--- Adds query to URL
    };
    
    const configuredURL =this.state.userName? getConfiguredURL(this.state.userName): undefined //--- if userName exist than add to URL

    const getData = async () => {
      if (configuredURL) {
        const apiResponse = await fetch(configuredURL).then(async (response) => { //--- Call api with configured URL
          if (response.status == 500) {
            const errorText = await response.text()
  
            this.setState({
              ...this.state,
              dataError:
                errorText || 'ERROR: retrieving your transactions',
            })
          } else if (response.status == 200) {
            const data: Data[] = await response.json().catch((error) =>{
              throw new Error('Response JSON was invalid. Error:' + error)
            })
            return data
          }
        })
        return apiResponse
      }
    };
  }

  async componentWillMount() {
    if (!this.state.authError) {
      if (await localAuth(this.loadData)) {
        this.setState({ ...this.state, loggedIn: true });
      } else {
        this.setState({ ...this.state, authError: true });
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
      );
    } else {
      return (
        <Layout>
          <h1>Check Recent Transactions</h1>
          <Login onSignIn={this.loadData} />
        </Layout>
      );
    }
  }
}
