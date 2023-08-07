import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { themeCSS } from '../../styles/theme'
import '../card/request-card'
import { RadixButtonMode, RequestItem } from '../../_types'

@customElement('radix-request-cards')
export class RadixRequestCards extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: RadixButtonMode = RadixButtonMode.light

  @property({ type: Array })
  requestItems: RequestItem[] = []

  render() {
    return (this.requestItems || []).map(
      (requestItem) => html`<radix-request-card
        type="${requestItem.type}"
        status="${requestItem.status}"
        id="${requestItem.id}"
        ?showCancel="${requestItem.showCancel}"
        @onCancel=${(event: any) => {
          this.dispatchEvent(
            new CustomEvent('onCancel', {
              detail: event.detail,
              bubbles: true,
              composed: true,
            })
          )
        }}
        timestamp=${requestItem.timestamp}
        mode=${this.mode}
      ></radix-request-card>`
    )
  }

  static styles = [themeCSS]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-request-cards': RadixRequestCards
  }
}
