import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import WalletSdk, { WalletSdk as WalletSdkType } from '@radixdlt/wallet-sdk'
import { Subject, tap } from 'rxjs'

const onConnectSubject = new Subject<void>()

let walletSdk: WalletSdkType

const onConnect$ = onConnectSubject.asObservable()

export const configure = (
  input: Parameters<typeof WalletSdk>[0] & { onConnect: () => void }
) => {
  const { onConnect, ...rest } = input
  walletSdk = WalletSdk(rest)

  const subscription = onConnect$.pipe(tap(onConnect)).subscribe()

  return {
    getWalletData: walletSdk.request,
    sendTransaction: walletSdk.sendTransaction,
    destroy: () => subscription.unsubscribe(),
  }
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
