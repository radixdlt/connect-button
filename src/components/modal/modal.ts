import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { themeCSS, variablesCSS } from '../../styles/theme'
import { RadixButtonMode } from '../../_types'

@customElement('radix-modal')
export class RadixModal extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: RadixButtonMode = RadixButtonMode.light

  @property({
    type: Boolean,
    reflect: true,
  })
  show = true

  @property({
    type: Boolean,
  })
  showCloseButton = true

  onClose() {
    this.dispatchEvent(
      new CustomEvent('onClose', {
        bubbles: true,
        composed: true,
      })
    )
  }

  render() {
    if (this.show)
      return html`<div class="content">
        <slot></slot>
      </div>`

    return null
  }

  static styles = [
    variablesCSS,
    themeCSS,
    css`
      :host(:not([show])) {
        display: none;
      }

      :host([show]) {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding: 14px;
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
      }

      .content {
        position: relative;
        display: flex;
        flex-direction: column;
        opacity: 0;
        -webkit-animation: slide-bottom 0.2s
          cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        animation: slide-bottom 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        margin-top: 20vh;
        background-color: var(--radix-card-background);
        padding: 1rem;
        border-radius: 12px;
        max-width: 778px;
        width: 100%;
      }

      @-webkit-keyframes slide-bottom {
        0% {
          -webkit-transform: translateY(-20px);
          transform: translateY(-20px);
        }
        100% {
          -webkit-transform: translateY(0px);
          transform: translateY(0px);
          opacity: 1;
        }
      }

      @keyframes slide-bottom {
        0% {
          -webkit-transform: translateY(-20px);
          transform: translateY(-20px);
        }
        100% {
          -webkit-transform: translateY(0px);
          transform: translateY(0px);
          opacity: 1;
        }
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-modal': RadixModal
  }
}
