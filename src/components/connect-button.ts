import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { onConnectSubject, onDestroySubject } from '../api'
import './loading-spinner'

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

  render() {
    return html`
      <div class="wrapper">
        <button @click=${this.onClick} part="button">
          ${this.loading ? html`<loading-spinner />` : html`${this.buttonText}`}
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
      border-radius: 8px;
      border: 1px solid transparent;
      font-size: 1rem;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      transition: border-color 0.25s;
      background: #060f8f;
      color: white;
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
