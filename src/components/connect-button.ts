import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { config } from '../config'
import './loading-spinner'
import './popover'
import './button'
import './request-item'
import logoGradient from '../assets/logo-gradient.png'
import infoIcon from '../assets/icon-info.svg'
import userIcon from '../assets/icon-user.svg'
import linkIcon from '../assets/icon-link.svg'
import { color } from '../styles'
import { filter, fromEvent, Subscription, tap } from 'rxjs'
import { Account, PersonaData, RequestItem } from '../_types'
import { RadixRequestItem } from './request-item'

@customElement(config.elementTag)
export class ConnectButton extends LitElement {
  @property({ type: Boolean })
  connected = false

  @property({ type: Boolean })
  loading = false

  @property({ type: Boolean })
  showNotification = false

  @property({
    type: Boolean,
  })
  showPopover: boolean = false

  @property({
    type: Boolean,
  })
  connecting: boolean = false

  @property({ type: Array })
  requestItems: RequestItem[] = []

  @property({ type: Array })
  accounts: Account[] = []

  @property({
    type: Array,
  })
  personaData: PersonaData[] = []

  @property({ type: Object })
  explorer: { baseUrl: string; transactionPath: string; accountsPath: string } =
    {
      baseUrl: 'https://betanet-dashboard.radixdlt.com/',
      transactionPath: 'transaction/',
      accountsPath: 'account/',
    }

  @property({ type: String })
  dAppName: string = ''

  @property({ type: String })
  personaLabel: string = ''

  get hasSharedData(): boolean {
    return !!(this.accounts.length || this.personaData.length)
  }

  private subscriptions = new Subscription()

  private readonly fontGoogleApiHref =
    'https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,600'

  constructor() {
    super()
    this.injectFontCSS()
    this.subscriptions.add(
      fromEvent<MouseEvent>(window, 'click')
        .pipe(
          filter(() => this.showPopover),
          filter((event) => !this.contains(event.target as HTMLElement)),
          tap(() => (this.showPopover = false))
        )
        .subscribe()
    )
  }

  connectedCallback(): void {
    super.connectedCallback()
    this.dispatchEvent(
      new CustomEvent('onRender', {
        bubbles: true,
        composed: true,
      })
    )
  }

  disconnectedCallback(): void {
    this.dispatchEvent(
      new CustomEvent('onDestroy', {
        bubbles: true,
        composed: true,
      })
    )
  }

  private shouldSkipFontInjection(): boolean {
    return (
      !!document.head.querySelector(
        `link[href|="${this.fontGoogleApiHref}"]`
      ) || document.fonts.check('16px IBM Plex Sans')
    )
  }

  private injectFontCSS() {
    if (this.shouldSkipFontInjection()) {
      return
    }

    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', this.fontGoogleApiHref)
    document.head.append(link)
  }

  private togglePopover() {
    this.showPopover = !this.showPopover
    if (this.showPopover)
      this.dispatchEvent(
        new CustomEvent('onShowPopover', {
          bubbles: true,
          composed: true,
        })
      )
  }

  private formatAccountAddress(address: string) {
    return `${address.slice(0, 4)}...${address.slice(-6)}`
  }

  private formatAccountLabel(label: string) {
    return label.length > 14 ? `${label.slice(0, 12).trimEnd()}...` : label
  }

  private connectButtonTemplate() {
    const buttonText = this.connected ? 'Connected' : 'Connect'

    return html` <radix-button
      ?loading=${this.loading}
      ?gradient=${this.connected}
      @onClick=${this.togglePopover}
      logo
      fullWidth
      >${this.loading ? '' : buttonText}</radix-button
    >`
  }

  private requestItemsTemplate() {
    if (this.requestItems.length === 0) return ''

    return html`<div class="wrapper request-item-list">
      ${this.requestItems
        .slice(-3)
        .reverse()
        .map(
          (item) =>
            html`<div class="wrapper request-item">
              <radix-request-item
                .item=${item}
                transactionExplorerBaseUrl="${this.explorer.baseUrl}${this
                  .explorer.transactionPath}"
                @onCancel=${() => {
                  this.dispatchEvent(
                    new CustomEvent('onCancelRequestItem', {
                      detail: { id: item.id },
                      bubbles: true,
                      composed: true,
                    })
                  )
                }}
              ></radix-request-item>
            </div>`
        )}
    </div>`
  }

  private connectTemplate() {
    if (!this.connected && !this.connecting)
      return html`<div class="wrapper connect">
        <div class="wrapper connect-your-wallet">
          <img class="logo" src=${logoGradient} />
          <span class="text connect">Connect your Radix Wallet</span>
        </div>
        <radix-button
          fullWidth
          @onClick=${() => {
            this.dispatchEvent(
              new CustomEvent('onConnect', {
                bubbles: true,
                composed: true,
              })
            )
          }}
          >Connect Now</radix-button
        >
        <a
          class="link wallet"
          href=${config.links['What is a radix wallet?']}
          target="_blank"
          >What is a Radix Wallet?</a
        >
      </div>`
    return ''
  }

  private disconnectWalletTemplate() {
    if (this.connected)
      return html`<radix-button
        text
        mb="0.5"
        alignSelf="center"
        @onClick=${() => {
          this.dispatchEvent(
            new CustomEvent('onDisconnect', {
              bubbles: true,
              composed: true,
            })
          )
        }}
        >Disconnect Wallet</radix-button
      >`

    return ''
  }

  private updateSharedDataTemplate() {
    if (this.connected && this.accounts.length)
      return html`<radix-button
        secondary
        text
        mb="0"
        fontWeight="400"
        alignSelf="center"
        @onClick=${() => {
          this.dispatchEvent(
            new CustomEvent('onUpdateSharedData', {
              bubbles: true,
              composed: true,
            })
          )
        }}
        >Update shared data</radix-button
      >`

    return ''
  }

  private accountListTemplate() {
    return html`<div class="wrapper account-list">
      ${this.accounts.map(
        (account) =>
          html`<div class="wrapper account gradient-${account.appearanceId}">
            <span class="text account-label"
              >${this.formatAccountLabel(account.label)}</span
            >
            <a
              class="text account-address"
              target="_blank"
              href="${this.explorer.baseUrl}${this.explorer
                .accountsPath}${account.address}"
              >${this.formatAccountAddress(account.address)}<span
                class="icon link"
              ></span
            ></a>
          </div>`
      )}
    </div>`
  }

  private sharedDataTemplate() {
    if (this.accounts.length && this.connected)
      return html`<div class="wrapper sharing">
        ${this.accountListTemplate()}
      </div> `

    return ''
  }

  private personaTemplate() {
    if (this.personaLabel && this.connected)
      return html`<span class="text sharing"
          >You're sharing with ${this.dAppName}:</span
        >
        <div class="wrapper persona">
          <i class="icon user"></i>
          <div class="wrapper persona-data">
            <span class="text persona-label">${this.personaLabel}</span>
            ${this.personaData.map(
              (data) => html`<div class="text persona-data">${data.value}</div>`
            )}
          </div>
        </div>`

    return ''
  }

  private popoverTemplate() {
    if (!this.showPopover) return ''

    return html`<radix-popover class="popover"
      >${this.requestItemsTemplate()}${this.personaTemplate()}${this.sharedDataTemplate()}${this.updateSharedDataTemplate()}${this.disconnectWalletTemplate()}${this.connectTemplate()}</radix-popover
    >`
  }

  private notificationTemplate() {
    if (this.showNotification)
      return html`<span class="icon notification"></span>`

    return ''
  }

  render() {
    return html`
      <div class="wrapper main">
        ${this.connectButtonTemplate()}${this.notificationTemplate()}
        ${this.popoverTemplate()}
      </div>
    `
  }

  static styles = css`
    :host {
      font-family: 'IBM Plex Sans';
      position: relative;
      display: inline-block;
    }
    .popover {
      position: absolute;
      top: calc(100% + 1rem);
      right: 0;
    }
    .wrapper.main {
      width: 8.6rem;
    }
    .wrapper.request-item-list {
      margin-bottom: 1rem;
    }
    .wrapper.request-item {
      margin-bottom: 0.5rem;
    }
    .wrapper.request-item:last-of-type {
      margin-bottom: 0;
    }
    .wrapper.connect {
      margin-bottom: 1rem;
    }
    .wrapper.connect-your-wallet {
      display: flex;
      margin-bottom: 1.5rem;
    }
    .wrapper.account {
      background: #ced2d9;
      display: flex;
      width: 100%;
      padding: 0.5em 0.5em;
      box-sizing: border-box;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      border-radius: 12px;
    }
    .wrapper.persona {
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 0.5rem;
      border-radius: 12px;
      padding: 0.5rem;
      border-radius: 12px;
      background: #e2e5ed;
      display: flex;
    }
    .wrapper.sharing {
      margin-bottom: 1rem;
    }
    .wrapper.persona-data {
      align-self: center;
      margin-left: 1rem;
    }
    .account.gradient-0 {
      background: linear-gradient(276.58deg, #01e2a0 -0.6%, #052cc0 102.8%);
    }
    .account.gradient-1 {
      background: linear-gradient(276.33deg, #ff43ca -14.55%, #052cc0 102.71%);
    }
    .account.gradient-2 {
      background: linear-gradient(276.33deg, #20e4ff -14.55%, #052cc0 102.71%);
    }
    .account.gradient-3 {
      background: linear-gradient(94.8deg, #00ab84 -1.2%, #052cc0 103.67%);
    }
    .account.gradient-4 {
      background: linear-gradient(94.62deg, #ce0d98 -10.14%, #052cc0 104.1%);
    }
    .account.gradient-5 {
      background: linear-gradient(276.33deg, #052cc0 -14.55%, #0dcae4 102.71%);
    }
    .account.gradient-6 {
      background: linear-gradient(90.89deg, #003057 -2.21%, #03d597 102.16%);
    }
    .account.gradient-7 {
      background: linear-gradient(276.23deg, #f31dbe -2.1%, #003057 102.67%);
    }
    .account.gradient-8 {
      background: linear-gradient(276.48deg, #003057 -0.14%, #052cc0 102.77%);
    }
    .account.gradient-9 {
      background: linear-gradient(276.32deg, #1af4b5 -5.15%, #0ba97d 102.7%);
    }
    .account.gradient-10 {
      background: linear-gradient(276.23deg, #e225b3 -2.1%, #7e0d5f 102.67%);
    }
    .account.gradient-11 {
      background: linear-gradient(276.48deg, #1f48e2 -0.14%, #040b72 102.77%);
    }
    .account:last-of-type {
      margin-bottom: 0;
    }
    .text.connect {
      color: ${color.radixGrey1};
      font-style: normal;
      font-size: 1.1rem;
      width: 10rem;
      margin-left: 0.9rem;
      font-weight: 600;
      text-align: left;
    }
    .text.sharing {
      font-size: 1.1rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
      display: inline-block;
    }
    .text.account-label {
      color: white;
      font-weight: 600;
      margin-left: 1rem;
      font-size: 1rem;
      word-break: break-word;
    }
    .text.account-label:first-letter {
      text-transform: uppercase;
    }
    .text.account-address {
      color: white;
      opacity: 0.8;
      margin-right: 1rem;
      font-size: 0.9rem;
      align-self: center;
      white-space: nowrap;
    }
    .text.persona-label {
      font-weight: 600;
    }
    loading-spinner.small {
      display: inline-block;
      vertical-align: top;
    }
    .logo {
      width: 3rem;
      align-self: center;
    }
    .link.wallet {
      margin-top: 1.2rem;
      text-decoration: none;
      color: ${color.radixBlue};
      font-size: 1rem;
      font-weight: 600;
      display: inline-block;
    }
    .link.wallet::before {
      position: relative;
      top: 0.2rem;
      padding-right: 0.2rem;
      content: url(${unsafeCSS(infoIcon)});
    }
    .icon.user {
      background: white;
      display: inline-block;
      height: 2rem;
      width: 2rem;
      text-align: center;
      border-radius: 50%;
      margin-left: 1rem;
      align-self: center;
    }
    .icon.user::before {
      position: relative;
      top: 0.05rem;
      content: url(${unsafeCSS(userIcon)});
    }
    .icon.link {
      display: inline-block;
      width: 0.7rem;
      margin-left: 0.3rem;
    }
    .icon.link::before {
      content: url(${unsafeCSS(linkIcon)});
      align-self: center;
    }
    .icon.notification {
      width: 0.8rem;
      height: 0.8rem;
      background: #f81b1b;
      position: absolute;
      border-radius: 50%;
      right: 0.5rem;
      bottom: calc(100% - 0.5rem);
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-connect-button': ConnectButton
    'radix-request-item': RadixRequestItem
  }
}
