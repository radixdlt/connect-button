import { html, css, LitElement, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { Mode, themeCSS } from '../../styles/theme'
import UncheckedIcon from '../../assets/unchecked.svg'
import CheckedIcon from '../../assets/checked.svg'

@customElement('radix-card')
export class RadixCard extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: Mode = 'light'

  @property({
    type: String,
    reflect: true,
  })
  icon?: 'unchecked' | 'checked' | 'pending' | 'success' | 'error'

  @property({
    type: String,
  })
  header: string = ''

  @property({
    type: Number,
    reflect: true,
  })
  timestamp?: number

  private formatTimestamp(timestamp: number) {
    const date = new Date(timestamp)

    return `${date.getDate()} ${date.toLocaleTimeString()}`
  }

  render() {
    const renderDate = () =>
      this.timestamp
        ? html`<div class="date">${this.formatTimestamp(this.timestamp)}</div>`
        : ''

    const gridTemplateColumns = `${this.icon ? '30px' : ''} 1fr ${
      this.timestamp ? '60px' : ''
    }`

    return html`<div class="card" style=${styleMap({ gridTemplateColumns })}>
      <i></i>
      <div class="content">
        <span>${this.header}</span>
        <slot />
      </div>
      ${renderDate()}
    </div>`
  }

  static styles = [
    themeCSS,
    css`
      :host {
        background-color: var(--radix-card-background);
        color: var(--radix-card-text-color);
        display: block;
        padding: 18px 20px;
        user-select: none;
        border-radius: 12px;
        width: 100%;
        box-sizing: border-box;
      }

      .card {
        display: grid;
        align-items: center;
        column-gap: 10px;
      }

      i::before {
        content: '';
        display: block;
        -webkit-mask-size: cover;
        mask-size: cover;
        background-color: var(--radix-card-text-color);
      }

      span {
        display: block;
        font-weight: 600;
        font-size: 18px;
      }

      p {
        margin: 0;
      }

      :host([icon='unchecked']) i::before {
        -webkit-mask-image: url(${unsafeCSS(UncheckedIcon)});
        mask-image: url(${unsafeCSS(UncheckedIcon)});
        width: 24px;
        height: 24px;
      }

      :host([icon='checked']) i::before {
        -webkit-mask-image: url(${unsafeCSS(CheckedIcon)});
        mask-image: url(${unsafeCSS(CheckedIcon)});
        width: 24px;
        height: 24px;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-card': RadixCard
  }
}
