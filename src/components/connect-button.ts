import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { config } from '../config'
import './popover/popover'
import './button/button'
import './card/card'
import './link/link'
import './pages/not-connected'
import './pages/sharing'
import './pages/requests'
import {
  Account,
  PersonaData,
  RadixButtonStatus,
  RadixButtonTheme,
  RequestItem,
} from '../_types'

@customElement(config.elementTag)
export class ConnectButton extends LitElement {
  @property({
    type: String,
  })
  theme: RadixButtonTheme = 'radix-blue'

  @property({ type: String })
  dAppName: string = ''

  @property({ type: String })
  personaLabel: string = ''

  @property({ type: Boolean })
  connected = false

  @property({
    type: String,
  })
  status: RadixButtonStatus = RadixButtonStatus.default

  @property({ type: String })
  loggedInTimestamp: string = ''

  @property({
    type: Boolean,
  })
  showPopover: boolean = false

  @property({ type: Array })
  requestItems: RequestItem[] = []

  @property({ type: Array })
  accounts: Account[] = []

  @property({
    type: Array,
  })
  personaData: PersonaData[] = []

  @property({
    type: Boolean,
  })
  isMobile: boolean = false

  @property({
    type: Boolean,
  })
  isWalletLinked: boolean = false

  @property({
    type: Boolean,
  })
  isExtensionAvailable: boolean = false

  @property({
    type: Boolean,
  })
  fullWidth: boolean = false

  @property({
    type: String,
  })
  activeTab: 'sharing' | 'requests' = 'sharing'

  @property({ type: String })
  mode: 'light' | 'dark' = 'light'

  @property({ type: String })
  avatarUrl: string = ''

  get hasSharedData(): boolean {
    return !!(this.accounts.length || this.personaData.length)
  }

  windowClickEventHandler: (event: MouseEvent) => void

  constructor() {
    super()

    this.windowClickEventHandler = (event) => {
      if (!this.showPopover) return
      if (this.contains(event.target as HTMLElement)) return
      this.showPopover = false
    }
    document.addEventListener('click', this.windowClickEventHandler)
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
    document.removeEventListener('click', this.windowClickEventHandler)
    this.dispatchEvent(
      new CustomEvent('onDestroy', {
        bubbles: true,
        composed: true,
      })
    )
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

  private connectButtonTemplate() {
    const buttonText = this.connected ? this.personaLabel : 'Connect'

    return html` <radix-button
      status=${this.status}
      theme=${this.theme}
      ?connected=${this.connected}
      ?fullWidth=${this.fullWidth}
      @onClick=${this.togglePopover}
      ><div>${buttonText}</div></radix-button
    >`
  }

  private connectTemplate() {
    if (this.connected) {
      return
    }

    return html` <radix-not-connected-page
      mode=${this.mode}
      status=${this.status}
      ?isMobile=${this.isMobile}
      .requestItems=${this.requestItems}
      ?isWalletLinked=${this.isWalletLinked}
      ?isExtensionAvailable=${this.isExtensionAvailable}
    >
    </radix-not-connected-page>`
  }

  private renderSharingTemplate() {
    return html` <radix-sharing-page
      mode=${this.mode}
      dAppName=${this.dAppName}
      avatarUrl=${this.avatarUrl}
      persona=${this.personaLabel}
      .personaData=${(this.personaData || []).map((data) => data.value)}
      .accounts=${this.accounts}
      @onLogout=${() => {
        this.dispatchEvent(
          new CustomEvent('onDisconnect', {
            bubbles: true,
            composed: true,
          })
        )
      }}
      @onUpdateData=${() => {
        this.dispatchEvent(
          new CustomEvent('onUpdateSharedData', {
            bubbles: true,
            composed: true,
          })
        )
      }}
    ></radix-sharing-page>`
  }

  private renderRequestItemsTemplate() {
    return html` <radix-requests-page
      mode=${this.mode}
      loggedInTimestamp=${this.loggedInTimestamp}
      dAppName=${this.dAppName}
      .requestItems=${this.requestItems}
    ></radix-requests-page>`
  }

  private popoverTemplate() {
    if (!this.showPopover) return ''

    return html` <radix-popover
      mode="${this.mode}"
      ?connected=${this.connected}
      class="popover"
    >
      ${this.connected
        ? html`
            <radix-tabs-menu
              active=${this.activeTab}
              mode=${this.mode}
              @onClick="${(event: CustomEvent) => {
                this.activeTab = event.detail.value
              }}"
            ></radix-tabs-menu>

            ${this.activeTab === 'sharing'
              ? this.renderSharingTemplate()
              : this.renderRequestItemsTemplate()}
          `
        : this.connectTemplate()}
    </radix-popover>`
  }

  render() {
    return html` ${this.connectButtonTemplate()} ${this.popoverTemplate()} `
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
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-connect-button': ConnectButton
  }
}
