import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('loading-spinner')
export class LoadingSpinner extends LitElement {
  render() {
    return html`<div class="loader"></div>`
  }

  static styles = css`
    :host {
      width: 1.5rem;
      height: 1.5rem;
      border: 3px solid #fff;
      border-left-color: rgba(255, 255, 255, 0.3);
      border-top-color: rgba(255, 255, 255, 0.3);
      border-bottom-color: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
      align-self: center;
      margin-top: 0.1rem;
    }

    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'loading-spinner': LoadingSpinner
  }
}
