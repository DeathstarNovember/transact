import { sampleUsers } from '../data'

export const encode64 = (input: string) => {
  return Buffer.from(input).toString('base64')
}

export const authenticate = (username: string, password: string) => {
  const candidate = sampleUsers.find((user) => user.username === username)

  if (!candidate) {
    return false
  }

  const encrypted = encode64(password)

  return candidate.password === encrypted
}

export * from './Login'
