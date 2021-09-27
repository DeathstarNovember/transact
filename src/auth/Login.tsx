import { LoginProps, LoginState } from '../types'
import React, { useState } from 'react'

import { authenticate } from '.'

const initialLoginState = {
  username: '',
  password: '',
  loginError: undefined,
}

const Login: React.FC<LoginProps> = ({ onSignIn }) => {
  const [state, setState] = useState<LoginState>(initialLoginState)

  const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, username: event.currentTarget.value })
  }

  const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, password: event.currentTarget.value })
  }

  const setLoginError = (error: string) => {
    setState({ ...initialLoginState, loginError: error })
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const target = e.target as typeof e.target & {
      username: { value: string }
      password: { value: string }
    }

    const username = target.username.value

    const password = target.password.value

    if (await authenticate(username, password)) {
      await onSignIn(username)
    } else {
      setLoginError('Invalid username or password.')
    }
  }

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <input
        value={state.username}
        name="username"
        placeholder="Username"
        onChange={changeUsername}
        style={inputStyles}
      />
      <input
        value={state.password}
        name="password"
        placeholder="Password"
        onChange={changePassword}
        style={inputStyles}
      />
      {state.loginError ? (
        <div style={{ fontFamily: 'sans-serif', color: 'pink' }}>
          {state.loginError}
        </div>
      ) : (
        <div style={{ height: '1em' }}></div>
      )}
      <input type="submit" />
    </form>
  )
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

export default Login
