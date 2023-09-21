import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { themeCSS } from '../../styles/theme'
import { RadixButtonMode } from '../../_types'
import UncheckedIcon from '../../assets/checkbox-unchecked.svg'
import CheckedIcon from '../../assets/checkbox-checked.svg'
import { classMap } from 'lit-html/directives/class-map.js'

@customElement('radix-checkbox')
export class RadixCheckbox extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: RadixButtonMode = RadixButtonMode.light

  @property({
    type: String,
  })
  id: string = ''

  @property({
    type: Boolean,
  })
  checked = false

  onChange(value: boolean) {
    this.dispatchEvent(
      new CustomEvent('onChange', {
        bubbles: true,
        composed: true,
        detail: value,
      })
    )
  }

  render() {
    return html`
      <label class="container" for=${this.id}>
        <span class=${classMap({ checked: this.checked })}></span>
        <slot></slot>

        <input
          type="checkbox"
          ?checked=${this.checked}
          id=${this.id}
          name=${this.id}
          @change=${(ev: InputEvent) => {
            const nextValue = (ev.target as HTMLInputElement)!.checked
            this.checked = nextValue
            this.onChange(nextValue)
          }}
        />
      </label>
    `
  }

  static styles = [
    themeCSS,
    css`
      .container {
        display: flex;
        position: relative;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }

      .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      span {
        width: 1rem;
        height: 1rem;
        background-size: contain;
        background-repeat: no-repeat;
        background-image: url(${unsafeCSS(UncheckedIcon)});
        align-self: center;
        margin-right: 0.5rem;
      }

      span.checked {
        background-image: url(${unsafeCSS(CheckedIcon)});
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-checkbox': RadixCheckbox
  }
}
