import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { themeCSS, Mode } from '../../styles/theme'

import NorthEastArrowIcon from '../../assets/icon-north-east-arrow.svg'
@customElement('radix-link')
export class RadixLink extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: Mode = 'light'

  @property({
    type: String,
  })
  url: string = ''

  @property({
    type: String,
  })
  displayText: string = ''

  render() {
    return html`<a target="_blank" href="${this.url}" class="link"
      >${this.displayText}
      <i class="icon-north-east-arrow"></i>
    </a>`
  }

  static styles = [
    themeCSS,
    css`
      .link {
        color: var(--radix-link-color);
        font-weight: 600;
        text-decoration: none;
        display: flex;
        align-items: center;
      }

      .icon-north-east-arrow::before {
        content: '';
        display: block;
        -webkit-mask-size: cover;
        mask-size: cover;
        background-color: var(--radix-card-text-dimmed-color);
        -webkit-mask-image: url(${unsafeCSS(NorthEastArrowIcon)});
        mask-image: url(${unsafeCSS(NorthEastArrowIcon)});
        width: 16px;
        height: 16px;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-link': RadixLink
  }
}
