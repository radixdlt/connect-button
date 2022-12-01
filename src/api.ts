import WalletSdk, { WalletSdk as WalletSdkType } from '@radixdlt/wallet-sdk'
import { Subject, Subscription, tap } from 'rxjs'

export const onConnectSubject = new Subject<void>()
export const onDestroySubject = new Subject<void>()

let walletSdk: WalletSdkType

const onConnect$ = onConnectSubject.asObservable()
const onDestroy$ = onDestroySubject.asObservable()

let buttonApi: ReturnType<typeof configure> | undefined

export const configure = (
  input: Parameters<typeof WalletSdk>[0] & {
    onConnect: () => void
    onDestroy?: () => void
  }
) => {
  const { onConnect, onDestroy, ...rest } = input
  walletSdk = WalletSdk(rest)

  const subscriptions = new Subscription()
  subscriptions.add(onConnect$.pipe(tap(onConnect)).subscribe())
  subscriptions.add(
    onDestroy$
      .pipe(
        tap(() => {
          if (onDestroy) onDestroy()
        })
      )
      .subscribe()
  )

  buttonApi = {
    getWalletData: walletSdk.request,
    sendTransaction: walletSdk.sendTransaction,
    destroy: () => {
      subscriptions?.unsubscribe()
      walletSdk.destroy()
    },
    onConnect$,
  }

  return {
    getWalletData: walletSdk.request,
    sendTransaction: walletSdk.sendTransaction,
    destroy: () => {
      subscriptions?.unsubscribe()
      walletSdk.destroy()
      buttonApi = undefined
    },
    onConnect$,
  }
}

export const getMethods = () => {
  if (!buttonApi) throw new Error('connect button has not been configured')

  return buttonApi
}

const getConnectButtonElement = () => {
  const connectButtonElement = document.querySelector('connect-button')
  if (!connectButtonElement) {
    throw new Error('connect button not found')
  }
  return connectButtonElement
}

export const setState = ({
  connected,
  loading,
}: {
  connected: boolean
  loading: boolean
}) => {
  const connectButton = getConnectButtonElement()
  connectButton.connected = connected
  connectButton.loading = loading
}
