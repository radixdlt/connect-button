import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { color } from '../styles'
import bgConnected from '../assets/bg-connected.svg'
import logo from '../assets/logo.svg'

@customElement('radix-button')
export class RadixButton extends LitElement {
  @property({ type: Boolean })
  loading = false

  private onClick(event: MouseEvent) {
    this.dispatchEvent(
      new CustomEvent('onClick', {
        detail: event,
        bubbles: true,
        composed: true,
      })
    )
  }

  render() {
    return html` <button part="button" @click=${this.onClick}>
        ${this.loading
          ? html`<loading-spinner />`
          : html`<slot></slot>`}</button
      ><slot></slot>`
  }

  static styles = css`
    button {
      width: 100%;
      height: 2.6rem;
      border-radius: 12px;
      border: 1px solid transparent;
      font-size: 1rem;
      font-weight: 500;
      font-family: inherit;
      transition: border-color 0.25s;
      background-color: ${color.radixBlue};
      color: white;
      text-shadow: 0px 0.7px 6px rgba(0, 0, 0, 0.7);
      background-color: ${color.radixBlue};
    }

    button::before {
      content: url(${unsafeCSS(logo)});
    }

    :host(.no-logo) > button::before {
      content: '';
    }

    :host(.gradient) > button {
      background: url(${unsafeCSS(bgConnected)}) no-repeat;
      background-size: cover;
      width: 8.6rem;
    }

    :host(.text) > button {
      background: none;
      color: ${color.radixBlue};
      text-shadow: 0px 0px 0px;
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
    'radix-button': RadixButton
  }
}
