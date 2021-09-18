import { LocalStorageType } from '../types'

export function setLocalStorage(item?: LocalStorageType) {
  window.localStorage.setItem(
    'transact_local',
    item ? JSON.stringify(item) : JSON.stringify({ currentUser: undefined }),
  )
}
