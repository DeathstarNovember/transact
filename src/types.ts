export type AppState = {
  data?: Data[]
  loggedIn: boolean
  authError: boolean
}

export type LoginProps = {
  onSignIn: (username: string) => void | Promise<void>
}

export type LoginState = {
  username: string
  password: string
  loginError?: string
}

export type TransactionsProps = { transactions?: Data[] }

export type LocalStorageType = {
  currentUser?: { token: string; username: string }
}

export type Data = {
  Amount: number
  ConfirmationNumber: string
  Id: string
  Status: 'COMPROMISED' | 'FRAUD' | 'VERIFIED'
  Memo: string
  Recipient: string
  TransactionType: string
  Account: string
  Date: string
}
