import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import loadingIcon from '../assets/icon-loading.svg'
import successIcon from '../assets/icon-success.svg'
import errorIcon from '../assets/icon-error.svg'
import { RequestItem, RequestItemType } from '../_types'
import { shortenAddress } from '../helpers/shorten-address'

const requestItemTypeToHumanReadable = {
  [RequestItemType.dataRequest]: 'Data request',
  [RequestItemType.loginRequest]: 'Login request',
  [RequestItemType.sendTransaction]: 'Send transaction',
} as const

@customElement('radix-request-item')
export class RadixRequestItem extends LitElement {
  @property({
    type: Object,
  })
  item?: RequestItem

  @property({
    type: String,
  })
  transactionExplorerBaseUrl?: string

  private onCancel() {
    this.dispatchEvent(
      new CustomEvent('onCancel', {
        detail: { id: this.item?.id },
        bubbles: true,
        composed: true,
      })
    )
  }

  private actionsTemplate() {
    if (this.item && this.item.status === 'pending' && this.item.showCancel)
      return html`<button @click=${this.onCancel} class="text cancel">
        Cancel
      </button>`
    else if (this.item?.status === 'fail')
      return html`<span class="text error">${this.item.error}</span>`
    else if (
      this.item?.type === 'sendTransaction' &&
      this.item.status === 'success' &&
      this.transactionExplorerBaseUrl
    ) {
      return html`<a
        target="_blank"
        href="${this.transactionExplorerBaseUrl}${this.item
          .transactionIntentHash}"
        class="text transaction"
        >${shortenAddress(this.item.transactionIntentHash)}</a
      >`
    }

    return ''
  }

  render() {
    if (!this.item) return ''
    return html`<div class="wrapper main">
      <div class="wrapper type-status">
        <span class="icon ${this.item?.status}"></span>
        <span class="text type"
          >${requestItemTypeToHumanReadable[this.item.type]}</span
        >
      </div>
      ${this.actionsTemplate()}
    </div>`
  }

  static styles = css`
    :host {
      background: #e2e5ed;
      display: flex;
      width: 100%;
      padding: 0.5em 1em;
      border-radius: 8px;
      box-sizing: border-box;
      height: 2rem;
    }
    a,
    a:visited {
      color: #003057;
    }
    .wrapper.main {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    .wrapper.type-status {
      display: flex;
      align-self: center;
    }
    .text.type {
      display: inline-block;
      font-size: 0.9rem;
      line-height: 1rem;
      margin-left: 0.75rem;
      white-space: nowrap;
    }
    .text.request:first-letter {
      text-transform: uppercase;
    }
    .text.cancel {
      align-self: center;
      cursor: pointer;
      font-size: 0.75rem;
      border: 1px solid grey;
      border-radius: 8px;
      padding: 0.1rem 0.4rem;
      transition: background-color 0.1s ease;
    }
    .text.error {
      align-self: center;
      font-size: 0.75rem;
      margin-left: 1rem;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .text.transaction {
      align-self: center;
      font-size: 0.75rem;
    }
    .text.cancel:hover {
      background: rgba(0, 0, 0, 0.1);
    }
    .text.status {
      text-transform: capitalize;
      font-weight: 500;
    }
    .icon {
      align-self: center;
      height: 1rem;
    }
    .icon.pending::before {
      content: url(${unsafeCSS(loadingIcon)});
    }
    .icon.success::before {
      content: url(${unsafeCSS(successIcon)});
    }
    .icon.fail::before {
      content: url(${unsafeCSS(errorIcon)});
      position: relative;
      top: -0.1rem;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-request-item': RadixRequestItem
  }
}
