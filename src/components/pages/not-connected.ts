import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { themeCSS } from '../../styles/theme'

import logoGradient from '../../assets/logo-gradient.png'
import { RadixButtonMode, RadixButtonStatus, RequestItem } from '../../_types'
import { classMap } from 'lit/directives/class-map.js'
import '../card/request-cards'

@customElement('radix-not-connected-page')
export class RadixNotConnectedPage extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: RadixButtonMode = RadixButtonMode.light

  @property({
    type: Boolean,
  })
  isMobile: boolean = false

  @property({
    type: String,
  })
  status: RadixButtonStatus = RadixButtonStatus.default

  @property({
    type: Boolean,
  })
  isWalletLinked: boolean = false

  @property({
    type: Boolean,
  })
  isExtensionAvailable: boolean = false

  @property({
    type: Array,
  })
  requestItems: RequestItem[] = []

  render() {
    return html`
      <div class="wrapper connect-your-wallet">
        <img class="logo" src=${logoGradient} />
        <span class="text connect">Connect Your Radix Wallet</span>
      </div>
      ${this.isMobile
        ? this.renderMobileTemplate()
        : this.status === RadixButtonStatus.pending
        ? this.renderRequestItemsTemplate()
        : this.renderConnectStepsTemplate()}
    `
  }

  private renderMobileTemplate() {
    return html` <div class="mobile-wrapper">
      <div class="header">Mobile dApps are coming soon.</div>
      <div class="content">
        For now, please connect to Radix dApps using a desktop web browser.
      </div>
    </div>`
  }

  private renderRequestItemsTemplate() {
    return html`<radix-request-cards
      mode=${this.mode}
      .requestItems=${this.requestItems}
    ></radix-request-cards>`
  }

  private connectNowButtonTemplate() {
    return html`<button
      class="${classMap({
        'connect-now': true,
        disabled: !this.isExtensionAvailable || !this.isWalletLinked,
      })}"
      @onClick=${() => {
        this.dispatchEvent(
          new CustomEvent('onConnect', {
            bubbles: true,
            composed: true,
          })
        )
      }}
    >
      Connect Now
    </button>`
  }

  private stepCardTemplate(header: string, condition: boolean, text: string) {
    return html`<radix-card
      class="card"
      mode=${this.mode}
      header="${header}"
      icon="${condition ? 'checked' : 'unchecked'}"
    >
      ${condition ? '' : html`<span class="subtitle">${text}</span>`}
    </radix-card>`
  }

  private renderConnectStepsTemplate() {
    if (this.isExtensionAvailable && this.isWalletLinked) {
      return this.connectNowButtonTemplate()
    }

    return html`<div class="info">
        To connect, you’ll need a couple of things first:
      </div>
      ${this.stepCardTemplate(
        'Radix Wallet mobile app',
        this.isWalletLinked,
        'Get the official Radix Wallet mobile app where you can manage your Accounts and Personas.'
      )}
      ${this.stepCardTemplate(
        'Radix Connector browser extension',
        this.isExtensionAvailable,
        'Get and link the Radix Connector browser extension to your Radix Wallet to connect securely to dApp websites.'
      )}
      ${this.connectNowButtonTemplate()}
      <div class="cta-link">
        <radix-link
          mode=${this.mode}
          displayText="Click here to download and set up"
        ></radix-link>
      </div>`
  }

  static styles = [
    themeCSS,
    css`
      :host {
        width: 100%;
      }
      .wrapper.connect-your-wallet {
        display: flex;
        align-items: center;
        margin: 1rem 0.5rem;
      }

      .card {
        margin-bottom: 10px;
      }
      .info {
        margin-bottom: 20px;
      }

      .connect-now {
        width: 100%;
        color: #fff;
        border-radius: 12px;

        height: 48px;

        font-size: 16px;
        font-weight: bold;
      }

      .connect-now:not(.disabled) {
        background: var(--color-radix-blue-2);
        cursor: pointer;
      }

      .connect-now.disabled {
        background: var(--radix-connect-now-disabled-button-background);
        color: var(--radix-connect-now-disabled-button-text);
      }

      .cta-link {
        display: flex;
        justify-content: center;
        margin: 25px 0 20px;
      }

      .logo {
        width: 4rem;
        align-self: center;
      }

      .text.connect {
        color: var(--color-text-primary);

        font-size: 1.5rem;
        width: 10rem;
        margin-left: 1rem;
        font-weight: 600;
        text-align: left;
      }

      .subtitle {
        color: var(--radix-card-text-dimmed-color);
      }

      .mobile-wrapper {
        display: flex;
        flex-direction: column;
        text-align: center;

        align-items: center;
        line-height: 30px;
        margin-bottom: 18px;
        margin-top: 25px;
      }

      .mobile-wrapper .header {
        font-size: 18px;
        font-weight: 600;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-not-connected-page': RadixNotConnectedPage
  }
}
