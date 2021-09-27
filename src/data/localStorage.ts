import { LocalStorageType } from '../types'

export function setLocalStorage(item?: LocalStorageType) {
  window.localStorage.setItem(
    'transact_local',
    item ? JSON.stringify(item) : JSON.stringify({ currentUser: undefined }),
  )
}
export function getLocalStorage() {
  const local = window.localStorage.getItem('transact_local')
  const storage = local ? (JSON.parse(local) as LocalStorageType) : undefined
  return storage
}

export function getCurrentUser() {
  return getLocalStorage()?.currentUser
}
