import WalletSdk, { WalletSdk as WalletSdkType } from '@radixdlt/wallet-sdk'
import { Observable, Subject, Subscription, tap } from 'rxjs'
import { config } from './config'

type ButtonState = {
  connected: boolean
  loading: boolean
}

type RadixConnectButtonApi = {
  getWalletData: WalletSdkType['request']
  sendTransaction: WalletSdkType['sendTransaction']
  setState: (input: Partial<ButtonState>) => void
  destroy: () => void
  onConnect$: Observable<void>
}

export const onConnectSubject = new Subject<void>()
export const onDisconnectSubject = new Subject<void>()
export const onDestroySubject = new Subject<void>()
export const onCancelSubject = new Subject<void>()

const onConnect$ = onConnectSubject.asObservable()
const onDisconnect$ = onDisconnectSubject.asObservable()
const onDestroy$ = onDestroySubject.asObservable()
const onCancel$ = onCancelSubject.asObservable()

let walletSdk: WalletSdkType | undefined
let buttonApi: RadixConnectButtonApi | undefined

export const configure = (
  input: Parameters<typeof WalletSdk>[0] & {
    onConnect: (buttonApi: RadixConnectButtonApi) => void
    onDisconnect: (buttonApi: RadixConnectButtonApi) => void
    onCancel?: () => void
    onDestroy?: () => void
  }
) => {
  const { onConnect, onDestroy, onDisconnect, onCancel, ...rest } = input
  walletSdk = WalletSdk(rest)

  const setState = ({ connected, loading }: Partial<ButtonState>) => {
    const connectButton = getConnectButtonElement()
    if (connected != null) connectButton.connected = connected
    if (loading != null) connectButton.loading = loading
  }

  buttonApi = {
    getWalletData: walletSdk.request,
    sendTransaction: walletSdk.sendTransaction,
    destroy: () => {
      subscriptions?.unsubscribe()
      walletSdk!.destroy()
    },
    onConnect$,
    setState,
  }

  const subscriptions = new Subscription()
  subscriptions.add(
    onConnect$.pipe(tap(() => onConnect(buttonApi!))).subscribe()
  )
  subscriptions.add(
    onDisconnect$.pipe(tap(() => onDisconnect(buttonApi!))).subscribe()
  )
  subscriptions.add(
    onCancel$
      .pipe(
        tap(() => {
          if (onCancel) onCancel()
        })
      )
      .subscribe()
  )
  subscriptions.add(
    onDestroy$
      .pipe(
        tap(() => {
          if (onDestroy) onDestroy()
        })
      )
      .subscribe()
  )

  return {
    getWalletData: walletSdk.request,
    sendTransaction: walletSdk.sendTransaction,
    setState,
    destroy: () => {
      subscriptions?.unsubscribe()
      walletSdk!.destroy()
      walletSdk = undefined
      buttonApi = undefined
    },
    onConnect$,
  }
}

export const getMethods = () => {
  if (!buttonApi)
    throw new Error('radix connect button has not been configured')
  return buttonApi
}

const getConnectButtonElement = () => {
  const connectButtonElement = document.querySelector(config.elementTag)
  if (!connectButtonElement) {
    throw new Error('radix connect button not found')
  }
  return connectButtonElement
}
