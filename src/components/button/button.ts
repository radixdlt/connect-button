import { LitElement, css, html, unsafeCSS } from 'lit'
import { classMap } from 'lit/directives/class-map.js'
import { customElement, property } from 'lit/decorators.js'
import {
  LoadingSpinner,
  loadingSpinnerCSS,
} from '../loading-spinner/loading-spinner'
import { themeCSS, Theme } from '../../styles/theme'
import logo from '../../assets/logo.svg'
import Gradient from '../../assets/gradient.svg'
import CompactGradient from '../../assets/compact-gradient.svg'
import AvatarPlaceholder from '../../assets/avatar-placeholder.svg'
import SuccessIcon from '../../assets/success.svg'
import ErrorIcon from '../../assets/error.svg'

import {
  BUTTON_COMPACT_MIN_WIDTH,
  BUTTON_MIN_HEIGHT,
  BUTTON_MIN_WIDTH,
} from '../../constants'

export const RadixButtonStatus = {
  pending: 'pending',
  success: 'success',
  error: 'error',
  default: 'default',
} as const

export type RadixButtonStatus = keyof typeof RadixButtonStatus

export type RadixButtonProps = {
  status: RadixButtonStatus
  connected: boolean
  fullWidth: boolean
  theme: Theme
}

@customElement('radix-button')
export class RadixButton extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  status: RadixButtonStatus = RadixButtonStatus.default

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
      if (this.status === RadixButtonStatus.pending && this.connected) {
        return html`${LoadingSpinner} <slot></slot>`
      } else if (this.status === RadixButtonStatus.pending) {
        return LoadingSpinner
      }

      return html`<slot></slot>`
    }

    const showLogo = this.status !== 'pending' && !this.connected
    const showGradient = this.connected

    return html`
      <button
        @click=${this.onClick}
        class=${classMap({
          logo: showLogo,
          gradient: showGradient,
        })}
      >
        ${renderContent()}
      </button>
    `
  }

  static styles = [
    themeCSS,
    loadingSpinnerCSS,
    css`
      :host {
        width: var(--radix-connect-button-width, auto);
        display: block;
        container-type: inline-size;
        user-select: none;
      }

      :host([full-width]) > button {
        width: 100%;
      }

      :host([full-width]) {
        width: 100%;
        display: inline-block;
      }

      ::slotted(*) {
        overflow: hidden;
        display: block;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
        width: auto;
        padding-right: 6px;
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
        align-content: center;
        align-items: center;
        font-family: inherit;
        font-weight: 500;
        transition: background-color 0.1s cubic-bezier(0.45, 0, 0.55, 1);
        min-width: ${BUTTON_COMPACT_MIN_WIDTH}px;
        min-height: ${BUTTON_MIN_HEIGHT}px;
        display: flex;
        gap: 5px;
        justify-content: center;
      }

      button::before {
        -webkit-mask-position: center;
        mask-position: center;
      }

      button:hover {
        background-color: var(--theme-background-hover);
      }

      button.logo::before {
        mask-image: url(${unsafeCSS(logo)});
        -webkit-mask-image: url(${unsafeCSS(logo)});
        background-color: var(--theme-text-color);
        content: '';
        min-height: 0.94em;
        min-width: 1.25em;
        display: block;
        mask-repeat: no-repeat;
        -webkit-mask-repeat: no-repeat;
        mask-size: contain;
        -webkit-mask-size: contain;
        font-size: 16px;
      }

      button.gradient.logo::before {
        background-color: var(--color-light);
      }

      :host([status='pending']) > button.gradient::before {
        display: none;
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
        grid-template-columns: 36px 1fr;
      }

      button.gradient::before {
        content: '';
        min-height: 0.94em;
        min-width: 1.25em;
        display: block;
        mask-repeat: no-repeat;
        -webkit-mask-repeat: no-repeat;
        mask-size: contain;
        -webkit-mask-size: contain;
        background-color: var(--color-light);
        mask-image: url(${unsafeCSS(AvatarPlaceholder)});
        -webkit-mask-image: url(${unsafeCSS(AvatarPlaceholder)});
        font-size: 26px;
      }

      :host([status='success']) > button,
      :host([status='error']) > button {
        gap: 2px;
      }

      :host([status='success']) > button::before {
        mask-image: url(${unsafeCSS(SuccessIcon)});
        -webkit-mask-image: url(${unsafeCSS(SuccessIcon)});
        font-size: 29px;
      }

      :host([status='error']) > button::before {
        mask-image: url(${unsafeCSS(ErrorIcon)});
        -webkit-mask-image: url(${unsafeCSS(ErrorIcon)});
        font-size: 29px;
      }

      button.gradient:hover {
        background-color: var(--color-radix-blue-1);
      }

      button:focus,
      button:focus-visible {
        outline: 0px auto -webkit-focus-ring-color;
      }

      @container (max-width: ${BUTTON_MIN_WIDTH - 1}px) {
        button {
          width: var(--radix-connect-button-height, ${BUTTON_MIN_HEIGHT}px);
          max-width: ${BUTTON_MIN_WIDTH - 16}px;
          max-height: ${BUTTON_MIN_WIDTH - 16}px;
          justify-content: center;
        }
        button.gradient {
          background-image: url(${unsafeCSS(CompactGradient)});
        }
      }
      @container (max-width: ${BUTTON_MIN_WIDTH - 16}px) {
        ::slotted(*) {
          display: none;
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
