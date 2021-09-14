import React, { Component } from 'react'
import { authenticate } from '.'

type LoginProps = { onSignIn: (username: string) => void }

type LoginState = { username: string; password: string; loginError?: string }

const initialLoginState = {
  username: 'user_bad',
  password: 'password_bad',
  loginError: undefined,
}

export default class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props)
    this.state = initialLoginState
    this.changeUsername = this.changeUsername.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.setLoginError = this.setLoginError.bind(this)
  }

  changeUsername(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ ...this.state, username: event.currentTarget.value })
  }

  changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, password: event.currentTarget.value })
  }

  setLoginError = (error: string) => {
    this.setState({ ...initialLoginState, loginError: error })
  }

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      username: { value: string }
      password: { value: string }
    }

    const username = target.username.value

    const password = target.password.value

    if (authenticate(username, password)) {
      this.props.onSignIn(username)
    } else {
      this.setLoginError('Invalid username or password.')
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={formStyles}>
        <input
          value={this.state.username}
          name="username"
          placeholder="Username"
          onChange={this.changeUsername}
          style={inputStyles}
        />
        <input
          value={this.state.password}
          name="password"
          placeholder="Password"
          onChange={this.changePassword}
          style={inputStyles}
        />
        {this.state.loginError ? (
          <div style={{ fontFamily: 'sans-serif', color: 'pink' }}>
            {this.state.loginError}
          </div>
        ) : (
          <div style={{ height: '1em' }}></div>
        )}
        <input type="submit" />
      </form>
    )
  }
}

const formStyles = {
  height: '200px',
  width: '300px',
  border: '2px solid black',
  padding: '3rem',
  display: 'grid',
  gap: '10px',
  gridTemplateColumns: '1fr',
}

const inputStyles = { height: '1.5rem', padding: '0.25rem' }
