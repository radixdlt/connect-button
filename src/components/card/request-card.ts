import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { themeCSS } from '../../styles/theme'
import './card'
import '../account/account'
import '../link/link'
import { shortenAddress } from '../../helpers/shorten-address'
import { classMap } from 'lit/directives/class-map.js'
import { RadixButtonMode, RequestItemType, RequestStatus } from '../../_types'
@customElement('radix-request-card')
export class RadixRequestCard extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: RadixButtonMode = RadixButtonMode.light

  @property({
    type: String,
  })
  type: keyof typeof RequestItemType = 'dataRequest'

  @property({
    type: String,
  })
  status: keyof typeof RequestStatus = 'pending'

  @property({
    type: Boolean,
  })
  showCancel: boolean = false

  @property({
    type: String,
  })
  timestamp: string = ''

  @property({
    type: String,
  })
  id: string = ''

  @property({
    type: String,
  })
  transactionIntentHash: string = ''

  render() {
    const icon = this.getIconFromStatus()
    const styling = this.getStylingFromStatus()
    const texts = {
      sendTransaction: {
        pending: 'Pending Transaction',
        fail: 'Transaction Failed',
        cancelled: 'Transaction Cancelled',
        success: 'Send transaction',
        content: html`
          ${this.renderTxIntentHash()}
          ${this.getRequestContentTemplate(
            'Open your Radix Wallet app to review the transaction'
          )}
        `,
      },
      dataRequest: {
        pending: 'Data Request Pending',
        fail: 'Data Request Rejected',
        cancelled: 'Data Request Rejected',
        success: 'Data Request',
        content: this.getRequestContentTemplate(
          'Open Your Radix Wallet App to complete the request'
        ),
      },
      loginRequest: {
        pending: 'Login Request Pending',
        fail: 'Login Request Rejected',
        cancelled: 'Login Request Rejected',
        success: 'Login Request',
        content: this.getRequestContentTemplate(
          'Open Your Radix Wallet App to complete the request'
        ),
      },
    }

    return html`<radix-card
      icon="${icon}"
      class=${styling}
      mode=${this.mode}
      timestamp="${this.timestamp}"
      header="${texts[this.type][this.status]}"
    >
      ${texts[this.type].content}
    </radix-card>`
  }

  private getRequestContentTemplate(text: string) {
    return this.status === 'pending'
      ? html`<div class="request-content">
          ${text}
          ${this.showCancel
            ? html`<div class="cancel" @click=${this.onCancel}>Cancel</div>`
            : ``}
        </div>`
      : ''
  }

  private getIconFromStatus() {
    return this.status === 'pending'
      ? 'pending'
      : this.status === 'cancelled' || this.status === 'fail'
      ? 'error'
      : 'checked'
  }

  private getStylingFromStatus() {
    return classMap({
      dimmed: this.status === 'fail' || this.status === 'cancelled',
      inverted: this.status === 'pending',
    })
  }

  private onCancel(event: MouseEvent) {
    this.dispatchEvent(
      new CustomEvent('onCancelRequestItem', {
        detail: {
          ...event,
          id: this.id,
        },
        bubbles: true,
        composed: true,
      })
    )
  }

  private renderTxIntentHash() {
    return this.transactionIntentHash
      ? html`<div class="transaction">
          <span class="text-dimmed">ID:</span>
          <radix-link
            url="${this.transactionIntentHash}"
            displayText="${shortenAddress(this.transactionIntentHash)}"
            mode=${this.mode}
            @click=${(event: MouseEvent) => {
              event.preventDefault()
              this.dispatchEvent(
                new CustomEvent('onLinkClick', {
                  bubbles: true,
                  composed: true,
                  detail: {
                    type: 'transaction',
                    data: this.transactionIntentHash,
                  },
                })
              )
            }}
          ></radix-link>
        </div>`
      : ''
  }

  static styles = [
    themeCSS,
    css`
      :host {
        display: flex;
        width: 100%;
        margin-bottom: 10px;
      }

      .text-dimmed {
        color: var(--radix-card-text-dimmed-color);
        margin-right: 5px;
      }

      .transaction {
        font-weight: 600;
        text-decoration: none;
        display: flex;
        align-items: center;
      }

      .cancel {
        cursor: pointer;
        text-decoration: underline;
      }

      .request-content {
        margin-top: 5px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-request-card': RadixRequestCard
  }
}
