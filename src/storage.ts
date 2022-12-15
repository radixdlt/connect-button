const connectedStateKey = 'radixdlt.connected'

export const getConnectedState = (): boolean => {
  return localStorage.getItem(connectedStateKey) === 'true' ? true : false
}

export const storeConnectedState = (value: boolean) => {
  if (value) {
    localStorage.setItem(connectedStateKey, String(value))
  } else {
    localStorage.removeItem(connectedStateKey)
  }
}