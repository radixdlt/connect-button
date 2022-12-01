import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import WalletSdk, { WalletSdk as WalletSdkType } from '@radixdlt/wallet-sdk'

@customElement('connect-button')
export class ConnectButton extends LitElement {
  @property({ type: Boolean })
  connected = false

  @property({ type: Boolean })
  loading = false

  @property({ type: Number, attribute: 'network-id' })
  networkId: number | undefined = undefined

  @property({ type: String, attribute: 'dapp-id' })
  dAppId: string | undefined = undefined

  walletSdk: WalletSdkType | undefined

  private getWalletSdk() {
    if (!this.walletSdk) throw new Error('Wallet SDK not found')

    return this.walletSdk
  }

  connectedCallback() {
    super.connectedCallback()

    if (!this.dAppId) {
      throw new Error('dAppId not defined')
    }

    this.walletSdk = WalletSdk({
      logLevel: 'debug',
      networkId: this.networkId,
      dAppId: this.dAppId,
    })
  }

  constructor() {
    super()
  }

  private onClick() {
    this.loading = true
    this.getWalletSdk()
      .request({ oneTimeAccountsWithoutProofOfOwnership: {} })
      .map(({ oneTimeAccounts }) => {
        console.log(JSON.stringify(oneTimeAccounts, null, 2))
        this.connected = true
        this.loading = false
      })
  }

  get buttonText() {
    if (this.loading) {
      return 'Connecting...'
    } else if (this.connected) {
      return 'Connected'
    } else {
      return 'Connect'
    }
  }

  render() {
    return html`
      <div class="card">
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
      background-color: #1a1a1a;
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
