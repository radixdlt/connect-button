import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Mode, themeCSS } from '../../styles/theme'

import logoGradient from '../../assets/logo-gradient.png'

@customElement('radix-not-connected-page')
export class RadixNotConnectedPage extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: Mode = 'light'

  render() {
    return html` <div class="wrapper connect-your-wallet">
        <img class="logo" src=${logoGradient} />
        <span class="text connect">Connect Your Radix Wallet</span>
      </div>
      <slot></slot>`
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
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-not-connected-page': RadixNotConnectedPage
  }
}
