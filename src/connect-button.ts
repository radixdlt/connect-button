import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import WalletSdk, { WalletSdk as WalletSdkType } from '@radixdlt/wallet-sdk'
import { Subject, Subscription, tap } from 'rxjs'

const onConnectSubject = new Subject<void>()
const onDestroySubject = new Subject<void>()

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
  }

  return {
    getWalletData: walletSdk.request,
    sendTransaction: walletSdk.sendTransaction,
    destroy: () => {
      subscriptions?.unsubscribe()
      walletSdk.destroy()
      buttonApi = undefined
    },
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

@customElement('connect-button')
export class ConnectButton extends LitElement {
  @property({ type: Boolean })
  connected = false

  @property({ type: Boolean })
  loading = false

  get buttonText() {
    if (this.loading) {
      return 'Connecting...'
    } else if (this.connected) {
      return 'Connected'
    } else {
      return 'Connect'
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    onDestroySubject.next()
  }

  private onClick() {
    onConnectSubject.next()
  }

  render() {
    return html`
      <div class="wrapper">
        <button @click=${this.onClick} part="button">${this.buttonText}</button>
      </div>
    `
  }

  static styles = css`
    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'connect-button': ConnectButton
  }
}
