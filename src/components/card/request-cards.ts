import { html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { themeCSS } from '../../styles/theme'
import '../card/request-card'
import { ExplorerConfig, RadixButtonMode, RequestItem } from '../../_types'
import { defaultExplorerConfig } from '../../helpers/default-explorer-config'

@customElement('radix-request-cards')
export class RadixRequestCards extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: RadixButtonMode = RadixButtonMode.light

  @property({ type: Array })
  requestItems: RequestItem[] = []

  @property({ type: Object })
  explorer: ExplorerConfig = defaultExplorerConfig

  render() {
    return (this.requestItems || []).map(
      (requestItem) => html`<radix-request-card
        transactionExplorerBaseUrl=${this.explorer.baseUrl +
        this.explorer.transactionPath}
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
