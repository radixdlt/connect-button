import { html, css, LitElement } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { themeCSS } from '../../styles/theme'
import '../tabs-menu/tabs-menu'
import { encodeBase64 } from '../../helpers/encode-base64'
import { RadixButtonMode } from '../../_types'

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
    const fill = this.mode === 'light' ? '#D9D9D9' : '#000000'
    const height = this.height
    const startX = 13
    const startY = 15
    const endX = 440
    const endY = this.height
    const borderRadius = 12
    const halfBorderRadius = borderRadius / 2

    const shadow = `
      <filter id="shadow" color-interpolation-filters="sRGB">
        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-opacity="0.5"/>
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

    // filter="url(#shadow)"
    const svg = `
    <svg viewBox="0 0 441 ${
      height + 1
    }"  fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"  >
        <path
            d="${[
              `M ${startX} ${startY}`,
              drawArrow(350, startY, 17.5),
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
        justify-content: center;
        align-items: flex-start;
        padding: 35px 20px 10px;
        // TODO backdrop-filter: blur(30px);
      }

      #radix-popover-content {
        width: 400px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: column;
        overflow: auto;
        min-height: 170px;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-popover': RadixPopover
  }
}
