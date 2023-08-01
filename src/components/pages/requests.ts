import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { themeCSS } from '../../styles/theme'
import '../card/request-card'
import { ExplorerConfig, RadixButtonMode, RequestItem } from '../../_types'
import { defaultExplorerConfig } from '../../helpers/default-explorer-config'
import { pageStyles } from './styles'
import { formatTimestamp } from '../../helpers/format-timestamp'

@customElement('radix-requests-page')
export class RadixRequestsPage extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: RadixButtonMode = RadixButtonMode.light

  @property({ type: Array })
  requestItems: RequestItem[] = []

  @property({
    type: String,
  })
  dAppName: string = ''

  @property({
    type: String,
  })
  loggedInTimestamp: string = ''

  @property({ type: Object })
  explorer: ExplorerConfig = defaultExplorerConfig

  render() {
    return html`
      <div class="header">Sharing with ${this.dAppName}</div>
      <slot name="subheader"></slot>
      ${this.loggedInTimestamp
        ? html`<div class="subheader">
            Since logged in: ${formatTimestamp(this.loggedInTimestamp, ', ')}
          </div>`
        : ''}
      <div class="content">
        ${(this.requestItems || []).map(
          (requestItem) => html`<radix-request-card
            transactionExplorerBaseUrl=${this.explorer.baseUrl +
            this.explorer.transactionPath}
            type="${requestItem.type}"
            status="${requestItem.status}"
            id="${requestItem.id}"
            transactionIntentHash="${requestItem.transactionIntentHash}"
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
        )}
      </div>
    `
  }

  static styles = [
    themeCSS,
    pageStyles,
    css`
      .subheader {
        margin-top: -12px;
        margin-bottom: 15px;
        text-align: center;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-requests-page': RadixRequestsPage
  }
}
