import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { themeCSS } from '../../styles/theme'
import { RadixButtonMode } from '../../_types'
import CloseIcon from '../../assets/icon-close.svg'

@customElement('radix-modal-close-button')
export class RadixModalCloseButton extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: RadixButtonMode = RadixButtonMode.light

  onClick() {
    this.dispatchEvent(
      new CustomEvent('onClick', {
        bubbles: true,
        composed: true,
      })
    )
  }

  render() {
    return html`<button id="close-button-icon" @click=${this.onClick}></button>`
  }

  static styles = [
    themeCSS,
    css`
      #close-button-icon {
        -webkit-mask-image: url(${unsafeCSS(CloseIcon)});
        mask-image: url(${unsafeCSS(CloseIcon)});
        background-color: var(--radix-card-text-color);
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
        align-self: flex-start;
        cursor: pointer;
        transition: opacity 0.1s ease-in-out;
      }

      #close-button-icon:hover {
        opacity: 0.8;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-modal-close-button': RadixModalCloseButton
  }
}
