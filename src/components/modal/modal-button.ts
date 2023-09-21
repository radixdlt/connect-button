import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { themeCSS } from '../../styles/theme'

@customElement('radix-modal-button')
export class RadixModalButton extends LitElement {
  @property({
    type: Boolean,
    reflect: true,
  })
  disabled = false

  onClick() {
    this.dispatchEvent(
      new CustomEvent('onClick', {
        bubbles: true,
        composed: true,
      })
    )
  }

  render() {
    return html`<button ?disabled=${this.disabled} @click=${this.onClick}>
      <slot></slot>
    </button>`
  }

  static styles = [
    themeCSS,
    css`
      button {
        background-color: var(--color-radix-blue-2);
        color: var(--color-light);
        padding: 0.7rem 1rem;
        width: 100%;
        cursor: pointer;
        transition: opacity 0.1s ease-in-out;
        align-self: flex-end;
      }
      button[disabled] {
        opacity: 0.5;
        cursor: default;
      }

      button[disabled]:hover {
        opacity: 0.5;
      }

      button:hover {
        opacity: 0.8;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-modal-button': RadixModalButton
  }
}
