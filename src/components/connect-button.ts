import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { onConnectSubject, onDestroySubject } from '../api'
import './loading-spinner'
import bgConnect from '../assets/bg-connect.svg'
import bgConnected from '../assets/bg-connected.svg'
import { color } from '../styles'

@customElement('connect-button')
export class ConnectButton extends LitElement {
  @property({ type: Boolean })
  connected = false

  @property({ type: Boolean })
  loading = false

  get buttonText() {
    if (this.connected) {
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

  get classes() {
    const classList: string[] = []

    if (!this.loading) classList.push(this.connected ? 'connected' : 'connect')

    return classList.join(' ')
  }

  render() {
    return html`
      <div class="wrapper">
        <button @click=${this.onClick} part="button" class=${this.classes}>
          ${this.loading ? html`<loading-spinner />` : html``}
        </button>
      </div>
    `
  }

  static styles = css`
    :host {
      font-family: 'IBM Plex Sans';
    }
    .wrapper {
      width: 138px;
      height: 42px;
    }
    button {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      border: 1px solid transparent;
      font-size: 1rem;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      transition: border-color 0.25s;
      background-color: ${unsafeCSS(color.radixBlue)};
      color: white;
      text-shadow: 0px 0.732394px 5.85915px rgba(0, 0, 0, 0.7);
      background-color: ${unsafeCSS(color.radixBlue)};
    }
    .connect {
      background: url(${unsafeCSS(bgConnect)}) center no-repeat;
      background-color: ${unsafeCSS(color.radixBlue)};
    }
    .connected {
      background: url(${unsafeCSS(bgConnected)}) no-repeat;
      background-size: cover;
    }
    button:hover {
      border-color: none;
    }
    button:focus,
    button:focus-visible {
      outline: 0px auto -webkit-focus-ring-color;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'connect-button': ConnectButton
  }
}
