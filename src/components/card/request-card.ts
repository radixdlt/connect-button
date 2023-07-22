import { html, css, LitElement, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Mode, themeCSS } from '../../styles/theme'
import './card'
import '../account/account'
import { shortenAddress } from '../../helpers/shorten-address'
import NorthEastArrowIcon from '../../assets/icon-north-east-arrow.svg'
import { classMap } from 'lit/directives/class-map.js'
@customElement('radix-request-card')
export class RadixRequestCard extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: Mode = 'light'

  @property({
    type: String,
  })
  type: 'dataRequest' | 'transaction' = 'dataRequest'

  @property({
    type: String,
  })
  status: 'pending' | 'failed' | 'success' | 'cancelled' = 'pending'

  @property({
    type: String,
  })
  timestamp: string = ''

  @property({
    type: String,
  })
  interactionId: string = ''

  @property({
    type: String,
  })
  transactionIntentHash: string = ''

  @property({
    type: String,
  })
  transactionExplorerBaseUrl: string = ''

  render() {
    const icon = this.getIconFromStatus()
    const styling = this.getStylingFromStatus()
    const texts = {
      transaction: {
        pending: 'Pending Transaction',
        failed: 'Transaction Failed',
        cancelled: 'Transaction Cancelled',
        success: 'Send transaction',
        content: html`
          ${this.renderTxIntentHash()}
          ${this.status === 'pending'
            ? `Open your Radix Wallet app to review the transaction`
            : ''}
        `,
      },
      dataRequest: {
        pending: 'Data Request Pending',
        failed: 'Data Request Rejected',
        cancelled: 'Data Request Rejected',
        success: 'Data Request',
        content:
          this.status === 'pending'
            ? html`<div class="request-content">
                Open Your Radix Wallet App to complete the request
                <div class="cancel" @click=${this.onCancel}>Cancel</div>
              </div>`
            : '',
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

  private getIconFromStatus() {
    return this.status === 'pending'
      ? 'pending'
      : this.status === 'cancelled' || this.status === 'failed'
      ? 'error'
      : 'checked'
  }

  private getStylingFromStatus() {
    return classMap({
      dimmed: this.status === 'failed' || this.status === 'cancelled',
      inverted: this.status === 'pending',
    })
  }

  private onCancel(event: MouseEvent) {
    this.dispatchEvent(
      new CustomEvent('onCancel', {
        detail: {
          ...event,
          interactionId: this.interactionId,
        },
        bubbles: true,
        composed: true,
      })
    )
  }

  private renderTxIntentHash() {
    return this.transactionIntentHash
      ? html`<div class="transaction">
          <span class="text-dimmed mr-5">ID:</span>
          <a
            target="_blank"
            href="${this.transactionExplorerBaseUrl}${this
              .transactionIntentHash}"
            class="transaction"
            >${shortenAddress(this.transactionIntentHash)}
            <i class="icon-north-east-arrow"></i>
          </a>
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

      .mr-5 {
        margin-right: 5px;
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

      .transaction {
        color: var(--radix-card-link-color);
      }

      .text-dimmed {
        color: var(--radix-card-text-dimmed-color);
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
