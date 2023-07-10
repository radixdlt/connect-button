import { html, css, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { Mode, themeCSS } from '../../styles/theme'
import '../tabs/tabs'
import { encodeBase64 } from '../../helpers/encode-base64'

@customElement('radix-popover')
export class RadixPopover extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: Mode = 'light'

  @property({
    type: Boolean,
  })
  connected = false

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

  drawPopover() {
    const shadow = `
      <filter id="shadow" x="-5" y="-21" width="520" height="530" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="20" />
        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_27_446" />
        <feColorMatrix in="SourceAlpha" type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy="16" />
        <feGaussianBlur stdDeviation="17.5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.28 0" />
        <feBlend mode="normal" in2="effect1_backgroundBlur_27_446"
            result="effect2_dropShadow_27_446" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_27_446" result="shape" />
      </filter>`

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

    const height = this.height + 20
    const fill = this.mode === 'light' ? '#D9D9D9' : '#000000'

    const svg = `
    <svg viewBox="0 0 510 509" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="${[
              `M 42 20`,
              drawArrow(400, 20, 15),
              `L 468 20`,
              `C 474 20 480 26 480 32`,
              `L 480 ${height - 12}`,
              `C 480 ${height - 6} 474 ${height} 468 ${height}`,
              `L 42 ${height}`,
              `C 36 ${height} 30 ${height - 6} 30 ${height - 12}`,
              `L 30 32`,
              `C 30 26 36 20 42 20`,
              `Z`,
            ].join(' ')}"
            filter="url(#shadow)"
            stroke-width="1"
            stroke-opacity="${this.connected ? 1 : 0}"
            fill="${fill}"
            fill-opacity="0.5"
            stroke="url(#gradient)"
        />
        <defs>
          ${shadow}
          ${gradient}
        </defs>
     </svg>
    `

    return `data:image/svg+xml;base64,${encodeBase64(svg)}`
  }

  render() {
    return html`<style>
        :host {
          background-image: url(${this.drawPopover()});
        }
      </style>
      <div id="radix-popover-content"><slot /></div>`
  }

  static styles = [
    themeCSS,
    css`
      :host {
        user-select: none;
        display: inline-flex;
        background-position: center top;
        background-repeat: no-repeat;
        width: 500px;
        justify-content: center;
        align-items: flex-start;
        background-size: cover;
        padding: 35px 0;
      }

      #radix-popover-content {
        width: 400px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        overflow: auto;
        min-height: 215px;
        max-height: 560px;
        padding-bottom: 20px;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-popover': RadixPopover
  }
}
