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
import { classMap } from 'lit-html/directives/class-map.js'

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

  @property({ type: Boolean, state: true })
  compact = false

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

  private closePopover() {
    this.showPopover = false
  }

  private connectButtonTemplate() {
    const buttonText = this.connected ? this.personaLabel : 'Connect'

    return html` <radix-button
      status=${this.status}
      theme=${this.theme}
      ?connected=${this.connected}
      ?fullWidth=${this.fullWidth}
      @onClick=${this.togglePopover}
      @onResize=${(event: CustomEvent) => {
        this.compact = event.detail.offsetWidth === 40
      }}
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
      ?compact=${this.compact}
      ?isMobile=${this.isMobile}
      @onClosePopover=${() => {
        this.closePopover()
      }}
      class=${classMap({
        popover: true,
        'show-popover': this.showPopover,
        mobile: this.isMobile,
      })}
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
    return html`${this.connectButtonTemplate()} ${this.popoverTemplate()}`
  }

  static styles = css`
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200;400;500;600;700&display=swap');

    :root {
      font-family: 'IBM Plex Sans';
      font-weight: 400;
      margin: 0;
      font-size: 16px;
      line-height: 24px;
      font-weight: 400;

      color-scheme: light dark;
      color: rgba(255, 255, 255, 0.87);

      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-text-size-adjust: 100%;
    }

    :host {
      text-align: left;
      font-family: 'IBM Plex Sans';
      position: relative;
      z-index: 1000;
      display: inline-block;

      /* Core colors */
      --color-radix-green-1: #00ab84;
      --color-radix-green-2: #00c389;
      --color-radix-green-3: #21ffbe;
      --color-radix-blue-1: #060f8f;
      --color-radix-blue-2: #052cc0;
      --color-radix-blue-3: #20e4ff;
      --color-light: #ffffff;
      --color-dark: #000000;

      /* Accent colors */
      --color-accent-red: #ef4136;
      --color-accent-blue: #00aeef;
      --color-accent-yellow: #fff200;
      --color-alert: #e59700;
      --color-radix-error-red-1: #c82020;
      --color-radix-error-red-2: #fcebeb;

      /* Neutral colors */
      --color-grey-1: #003057;
      --color-grey-2: #8a8fa4;
      --color-grey-3: #ced0d6;
      --color-grey-4: #e2e5ed;
      --color-grey-5: #f4f5f9;
    }

    .popover {
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
    }

    .mobile.popover {
      position: fixed;
      top: 0;
      left: 0;
      right: unset;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: 16px;
    }

    @-webkit-keyframes slide-bottom {
      0% {
        -webkit-transform: translateY(-20px);
        transform: translateY(-20px);
      }
      100% {
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        opacity: 1;
      }
    }
    @keyframes slide-bottom {
      0% {
        -webkit-transform: translateY(-20px);
        transform: translateY(-20px);
      }
      100% {
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        opacity: 1;
      }
    }

    radix-popover {
      opacity: 0;
    }
    radix-popover.show-popover {
      -webkit-animation: slide-bottom 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)
        both;
      animation: slide-bottom 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-connect-button': ConnectButton
  }
}
