import { html, css, LitElement, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { themeCSS } from '../../styles/theme'
import '../tabs-menu/tabs-menu'
import { encodeBase64 } from '../../helpers/encode-base64'
import { RadixButtonMode } from '../../_types'
import CloseIcon from '../../assets/icon-close.svg'

@customElement('radix-popover')
export class RadixPopover extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: RadixButtonMode = RadixButtonMode.light

  @property({
    type: Boolean,
  })
  connected = false

  @property({
    type: Boolean,
  })
  compact = false

  @property({
    type: Boolean,
  })
  isMobile = false

  @state()
  private height = 0

  private resizeObserver: undefined | ResizeObserver

  connectedCallback() {
    super.connectedCallback()

    setTimeout(() => {
      const popoverContent = this.shadowRoot!.getElementById(
        'radix-popover-content'
      )!

      this.resizeObserver = new ResizeObserver(() => {
        this.height = popoverContent.scrollHeight
      })

      this.resizeObserver.observe(this)
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.resizeObserver?.unobserve(this)
  }

  closePopover() {
    this.dispatchEvent(
      new CustomEvent('onClosePopover', {
        bubbles: true,
        composed: true,
      })
    )
  }

  drawPopover() {
    const fill = this.mode === 'light' ? '#D9D9D9' : '#808080'
    const height = this.height
    const startX = 13
    const startY = 8
    const endX = 344
    const endY = height
    const borderRadius = 12
    const halfBorderRadius = borderRadius / 2

    const gradient = `
      <linearGradient id="gradient" x1="461.192" y1="52.4476" x2="81.1033" y2="460.678" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CE0D98" />
          <stop offset="0.210873" stop-color="#052CC0" />
          <stop offset="0.479167" stop-color="#20E4FF" />
          <stop offset="0.729604" stop-color="#052CC0" />
          <stop offset="1" stop-color="#21FFBE" />
      </linearGradient>`

    const drawArrow = (x: number, y: number, width: number) => `
      L ${x - width} ${y} 
      L ${x} 1
      L ${x + width} ${y}`

    const arrowXPosition = this.compact ? endX - 30 : 300

    const svg = `
    <svg viewBox="0 0 345 ${
      height + 1
    }"  fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"  >
        <path
            d="${[
              `M ${startX} ${startY}`,
              drawArrow(arrowXPosition, startY, 7),
              `L ${endX - borderRadius} ${startY}`,
              `C ${endX - halfBorderRadius} ${startY} ${endX} ${
                startY + halfBorderRadius
              } ${endX} ${startY + borderRadius}`,
              `L ${endX} ${endY - borderRadius}`,
              `C ${endX} ${endY - halfBorderRadius} ${
                endX - halfBorderRadius
              } ${endY} ${endX - borderRadius} ${endY}`,
              `L ${startX} ${endY}`,
              `C ${startX - halfBorderRadius} ${endY} ${
                startX - borderRadius
              } ${endY - halfBorderRadius} ${startX - borderRadius} ${
                endY - borderRadius
              }`,
              `L ${startX - borderRadius} ${startY + borderRadius}`,
              `C ${startX - borderRadius} ${startY + halfBorderRadius} ${
                startX - halfBorderRadius
              } ${startY} ${startX} ${startY}`,
              `Z`,
            ].join(' ')}"
            
            stroke-width="1"
            stroke-opacity="${this.connected ? 1 : 0}"
            fill="${fill}"
            fill-opacity="0.98"
            stroke="url(#gradient)"
        />
        <defs>
          ${gradient}
        </defs>
     </svg>
    `

    return `data:image/svg+xml;base64,${encodeBase64(svg)}`
  }

  render() {
    return this.isMobile
      ? html`<div id="radix-mobile-popover-content">
          <button
            id="close-button"
            @click=${() => {
              this.closePopover()
            }}
          ></button>
          <slot />
        </div>`
      : html`<style>
            :host {
              background-image: url(${this.drawPopover()});
            }
          </style>
          <div id="radix-popover-content">
            <slot />
          </div>`
  }

  static styles = [
    themeCSS,
    css`
      :host {
        user-select: none;
        display: inline-flex;
        background-position: center top;
        background-repeat: no-repeat;
        justify-content: center;
        align-items: flex-start;
        padding: 18px 12px 10px;
        // TODO backdrop-filter: blur(30px);
      }

      :host(.mobile) {
        background-color: var(--radix-card-background);
        width: 100vw;
      }

      #radix-popover-content {
        width: 344px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        overflow: auto;
        min-height: 130px;
      }
      #radix-mobile-popover-content {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        overflow: auto;
        min-height: 130px;
      }

      #close-button {
        -webkit-mask-image: url(${unsafeCSS(CloseIcon)});
        mask-image: url(${unsafeCSS(CloseIcon)});
        background-color: var(--radix-card-text-color);
        width: 24px;
        height: 24px;
        position: absolute;
        right: 1rem;
      }
      #close-button:hover {
        opacity: 0.8;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-popover': RadixPopover
  }
}
