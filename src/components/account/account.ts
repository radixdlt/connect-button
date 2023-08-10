import { RadixButtonMode } from './../../_types'
import { html, css, LitElement, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { themeCSS } from '../../styles/theme'
import CopyIcon from '../../assets/copy.svg'
import { shortenAddress } from '../../helpers/shorten-address'

@customElement('radix-account')
export class RadixAccount extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: RadixButtonMode = RadixButtonMode.light

  @property({
    type: String,
  })
  address = ''

  @property({
    type: String,
  })
  label = ''

  @property({
    type: Number,
    reflect: true,
  })
  appearanceId: number = 0

  private formatAccountLabel(label: string) {
    return label.length > 14 ? `${label.slice(0, 12).trimEnd()}...` : label
  }

  render() {
    return html` <span class="label"
        >${this.formatAccountLabel(this.label)}</span
      >
      <a
        class="address"
        target="_blank"
        href=${`${this.address}`}
        @click=${(event: MouseEvent) => {
          event.preventDefault()
          this.dispatchEvent(
            new CustomEvent('onLinkClick', {
              bubbles: true,
              composed: true,
              detail: { type: 'account', data: this.address },
            })
          )
        }}
      >
        ${shortenAddress(this.address)}<i
          @click=${(ev: MouseEvent) => {
            ev.preventDefault()
            ev.stopImmediatePropagation()
            navigator.clipboard.writeText(this.address)
          }}
        ></i>
      </a>`
  }

  static styles = [
    themeCSS,
    css`
      :host {
        display: flex;
        width: 100%;
        box-sizing: border-box;
        justify-content: space-between;
        margin-top: 0.5rem;
        border-radius: 12px;
        color: var(--color-light);
        font-size: 14px;
        height: 40px;
        align-items: center;
        padding: 0 20px;
      }

      .label {
        font-weight: 600;
        color: var(--color-light);
      }

      a {
        color: var(--color-light);
        display: flex;
        align-items: center;
        gap: 4px;
        opacity: 0.8;
        font-size: 12px;
      }

      i {
        background-image: url(${unsafeCSS(CopyIcon)});
        display: inline-block;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center bottom;
        width: 13px;
        height: 13px;
      }

      .label,
      a,
      i {
        text-shadow: 0px 4px 3px 0px rgba(0, 0, 0, 0.08);
      }

      :host([appearanceId='0']) {
        background: linear-gradient(276.58deg, #01e2a0 -0.6%, #052cc0 102.8%);
      }

      :host([appearanceId='1']) {
        background: linear-gradient(
          276.33deg,
          #ff43ca -14.55%,
          #052cc0 102.71%
        );
      }

      :host([appearanceId='2']) {
        background: linear-gradient(
          276.33deg,
          #20e4ff -14.55%,
          #052cc0 102.71%
        );
      }

      :host([appearanceId='3']) {
        background: linear-gradient(94.8deg, #00ab84 -1.2%, #052cc0 103.67%);
      }

      :host([appearanceId='4']) {
        background: linear-gradient(94.62deg, #ce0d98 -10.14%, #052cc0 104.1%);
      }

      :host([appearanceId='5']) {
        background: linear-gradient(
          276.33deg,
          #052cc0 -14.55%,
          #0dcae4 102.71%
        );
      }

      :host([appearanceId='6']) {
        background: linear-gradient(90.89deg, #003057 -2.21%, #03d597 102.16%);
      }

      :host([appearanceId='7']) {
        background: linear-gradient(276.23deg, #f31dbe -2.1%, #003057 102.67%);
      }

      :host([appearanceId='8']) {
        background: linear-gradient(276.48deg, #003057 -0.14%, #052cc0 102.77%);
      }

      :host([appearanceId='9']) {
        background: linear-gradient(276.32deg, #1af4b5 -5.15%, #0ba97d 102.7%);
      }

      :host([appearanceId='10']) {
        background: linear-gradient(276.23deg, #e225b3 -2.1%, #7e0d5f 102.67%);
      }

      :host([appearanceId='11']) {
        background: linear-gradient(276.48deg, #1f48e2 -0.14%, #040b72 102.77%);
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-account': RadixAccount
  }
}
