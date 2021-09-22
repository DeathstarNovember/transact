import { setLocalStorage } from '../data'
import { LocalStorageType } from '../types'

export const encode64 = (input: string) => {
  return Buffer.from(input).toString('base64')
}

const LIVE_URL = 'https://transact-example.herokuapp.com'

// const DEV_URL = 'http://localhost:5000'

const getAuthUrl = (username: string, password: string) => {
  const encryptedPassword = encode64(password)

  return `${LIVE_URL}/auth?username=${username}&password=${encryptedPassword}`
}

const getSessionUrl = (token: string) => {
  return `${LIVE_URL}/auth?token=${token}`
}

export const authenticate = async (
  username: string,
  password: string,
): Promise<boolean> => {
  const url = getAuthUrl(username, password)

  return fetch(url).then(async (response) => {
    if (response.status === 200) {
      const token = await response.text()

      setLocalStorage({ currentUser: { token } })

      return true
    } else {
      return false
    }
  })
}

export const localAuth = async (callback?: () => void): Promise<boolean> => {
  const storage = window.localStorage.getItem('transact_local')

  const session: LocalStorageType = storage
    ? JSON.parse(storage)
    : { currentUser: undefined }

  if (!session.currentUser) {
    setLocalStorage(session)

    return false
  } else {
    const sessionUrl = getSessionUrl(session.currentUser.token)

    return await fetch(sessionUrl).then(async (response) => {
      const token = await response.text()

      if (token) {
        setLocalStorage({ currentUser: { token } })

        if (callback) {
          callback()
        }

        return false
      } else {
        return false
      }
    })
  }
}
