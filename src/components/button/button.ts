import { LitElement, css, html, unsafeCSS } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { customElement, property } from 'lit/decorators.js'
import '../loading-spinner'
import { themeCSS, Theme } from '../../styles/theme'
import logo from '../../assets/logo.svg'
import Gradient from '../../assets/gradient.svg'
import CompactGradient from '../../assets/compact-gradient.svg'
import {
  BUTTON_COMPACT_MIN_WIDTH,
  BUTTON_MIN_HEIGHT,
  BUTTON_MIN_WIDTH,
} from '../../constants'

export type RadixButtonProps = {
  loading: boolean
  connected: boolean
  fullWidth: boolean
  theme: Theme
}

@customElement('radix-button')
export class RadixButton extends LitElement {
  @property({
    type: Boolean,
  })
  loading = false

  @property({
    type: Boolean,
  })
  connected = false

  @property({
    type: Boolean,
    reflect: true,
  })
  fullWidth = false

  @property({
    type: String,
    reflect: true,
  })
  theme: Theme = 'radix-blue'

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
    const renderContent = () => {
      if (this.loading) {
        return html`<loading-spinner />`
      }

      return html`<slot></slot>`
    }

    return html`
      <button
        @click=${this.onClick}
        class=${classMap({
          logo: !this.loading,
          gradient: this.connected,
        })}
        style=${styleMap({
          minHeight: `${BUTTON_MIN_HEIGHT}px`,
          minWidth: `${BUTTON_COMPACT_MIN_WIDTH}px`,
        })}
      >
        ${renderContent()}
      </button>
    `
  }

  static styles = [
    themeCSS,
    css`
      :host {
        width: var(--radix-connect-button-width, auto);
        display: block;
        container-type: inline-size;
      }

      :host([full-width]) > button {
        width: 100%;
      }

      :host([full-width]) {
        width: 100%;
        display: inline-block;
      }

      button {
        width: var(--radix-connect-button-width, auto);
        height: var(--radix-connect-button-height, auto);
        border-radius: var(--radix-connect-button-border-radius, 0);
        background-color: var(--theme-background);
        border: 1px solid var(--theme-border-color);
        color: var(--theme-text-color);
        container-type: inline-size;
        font-size: 16px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        font-family: inherit;
        font-weight: 500;
        transition: background-color 0.1s cubic-bezier(0.45, 0, 0.55, 1);
      }

      button:hover {
        background-color: var(--theme-background-hover);
      }

      :host(:not([disabled], .disabled)) > button {
        cursor: pointer;
      }

      button.logo::before {
        background-color: var(--theme-text-color);
        content: '';
        min-height: 0.94em;
        min-width: 1.25em;
        display: block;
        mask-image: url(${unsafeCSS(logo)});
        -webkit-mask-image: url(${unsafeCSS(logo)});
        mask-repeat: no-repeat;
        -webkit-mask-repeat: no-repeat;
        mask-size: contain;
        -webkit-mask-size: contain;
        font-size: 16px;
        margin-right: 0.5rem;
      }

      button.gradient.logo::before {
        background-color: var(--color-light);
      }

      :host(.no-logo) > button::before {
        content: '';
      }

      button.gradient {
        border: 1px solid transparent;
        background-repeat: no-repeat;
        background-origin: border-box;
        background-size: cover;
        background-position: center;
        background-color: var(--color-radix-blue-2);
        color: var(--color-light);
        background-image: url(${unsafeCSS(Gradient)});
      }

      button.gradient:hover {
        background-color: var(--color-radix-blue-1);
      }

      button:focus,
      button:focus-visible {
        outline: 0px auto -webkit-focus-ring-color;
      }

      @container (max-width: ${BUTTON_MIN_WIDTH}px) {
        button {
          text-indent: -999px;
          font-size: 0px;
          line-height: 0;
          width: var(--radix-connect-button-height, ${BUTTON_MIN_HEIGHT}px);
        }
        button.gradient {
          background-image: url(${unsafeCSS(CompactGradient)});
        }
      }
      @container (max-width: ${BUTTON_MIN_WIDTH - 16}px) {
        button.logo::before {
          margin-right: 0rem;
        }
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-button': RadixButton
  }
}
