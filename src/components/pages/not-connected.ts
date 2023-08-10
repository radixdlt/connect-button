import { html, css, LitElement, TemplateResult } from 'lit'
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
    let template: TemplateResult<1> = this.renderConnectTemplate()

    if (this.isMobile) template = this.renderMobileTemplate()
    else if (!this.isExtensionAvailable)
      template = this.renderCeNotInstalledTemplate()
    else if (!this.isWalletLinked) template = this.renderCeNotLinkedTemplate()
    else if (this.status === RadixButtonStatus.pending)
      template = this.renderRequestItemsTemplate()

    return html`
      <div class="wrapper connect-your-wallet">
        <img class="logo" src=${logoGradient} />
        <span class="text connect">Connect Your Radix Wallet</span>
      </div>
      ${template}
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
      class="request-cards"
      mode=${this.mode}
      .requestItems=${this.requestItems}
    ></radix-request-cards>`
  }

  private connectNowButtonTemplate() {
    const disabled = !this.isExtensionAvailable || !this.isWalletLinked
    return html`<button
      class="${classMap({
        'connect-now': true,
        disabled,
      })}"
      @click=${() => {
        if (disabled) return
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

  private renderCeNotInstalledTemplate() {
    return html`<div class="info">
        Before you can connect your Radix Wallet, you need the Radix Connector
        browser extension.
      </div>

      <div class="cta-link">
        <radix-link
          mode=${this.mode}
          href="/setup-guide"
          displayText="Download and Setup Guide"
          @click=${() => {
            this.dispatchEvent(
              new CustomEvent('onLinkClick', {
                bubbles: true,
                composed: true,
                detail: { type: 'setupGuide' },
              })
            )
          }}
        ></radix-link>
      </div>

      ${this.connectNowButtonTemplate()} `
  }

  private renderCeNotLinkedTemplate() {
    return html`<div class="info">
        To connect your Radix Wallet, you need to link it to your Radix
        Connector browser extension using a QR code.
      </div>

      <button
        class="${classMap({
          'connect-now': true,
        })}"
        @click=${() => {
          this.dispatchEvent(
            new CustomEvent('onLinkClick', {
              bubbles: true,
              composed: true,
              detail: { type: 'showQrCode' },
            })
          )
        }}
      >
        Open QR Code to Link Wallet
      </button>

      <div class="cta-link">
        <radix-link
          mode=${this.mode}
          href="/setup-guide"
          displayText="Download and Setup Guide"
          @click=${() => {
            this.dispatchEvent(
              new CustomEvent('onLinkClick', {
                bubbles: true,
                composed: true,
                detail: { type: 'setupGuide' },
              })
            )
          }}
        ></radix-link>
      </div>

      ${this.connectNowButtonTemplate()} `
  }

  private renderConnectTemplate() {
    return html` ${this.connectNowButtonTemplate()} `
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
        margin: 1rem 0.5rem 1.5rem;
        justify-content: center;
      }

      .request-cards {
        display: block;
        max-height: 410px;
        overflow-y: auto;
      }

      .card {
        margin-bottom: 10px;
      }
      .info {
        margin-bottom: 20px;
        font-size: 14px;
        text-align: center;
      }

      .connect-now {
        width: 100%;
        color: #fff;
        border-radius: 12px;
        height: 40px;
        font-size: 14px;
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
        width: 46px;
        align-self: center;
      }

      .text.connect {
        color: var(--color-text-primary);
        font-size: 18px;
        width: 7.2rem;
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
        margin-bottom: 18px;
        margin-top: 25px;
        font-size: 14px;
      }

      .mobile-wrapper .header {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 5px;
      }
      button {
        font-family: 'IBM Plex Sans', sans-serif;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-not-connected-page': RadixNotConnectedPage
  }
}
