import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import {
  onCancelSubject,
  onConnectSubject,
  onDestroySubject,
  onDisconnectSubject,
} from '../api'
import { config } from '../config'
import './loading-spinner'
import './popover'
import './button'
import logoGradient from '../assets/logo-gradient.png'
import infoIcon from '../assets/icon-info.svg'
import { color } from '../styles'
import { filter, fromEvent, Subscription, tap } from 'rxjs'

@customElement(config.elementTag)
export class ConnectButton extends LitElement {
  @property({ type: Boolean })
  connected = false

  @property({ type: Boolean })
  loading = false

  @property({ type: Boolean })
  showPopover = false

  private subscriptions = new Subscription()

  constructor() {
    super()
    this.subscriptions.add(
      fromEvent<MouseEvent>(window, 'click')
        .pipe(
          filter(() => this.showPopover),
          filter((event) => !this.contains(event.target as HTMLElement)),
          tap(() => {
            this.showPopover = false
          })
        )
        .subscribe()
    )
  }

  private onConnect() {
    onConnectSubject.next()
    this.loading = true
    this.showPopover = false
  }

  private cancelConnect() {
    onCancelSubject.next()
    this.loading = false
    this.showPopover = false
  }

  private togglePopover() {
    this.showPopover = !this.showPopover
  }

  connectButtonTemplate() {
    return this.loading
      ? html`<radix-button
          loading
          class="no-logo"
          @onClick=${this.togglePopover}
        />`
      : html`<radix-button
          class=${this.connected ? 'gradient' : ''}
          @onClick=${this.togglePopover}
          >${this.connected ? 'Connected' : 'Connect'}</radix-button
        >`
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    onDestroySubject.next()
    this.subscriptions.unsubscribe()
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('connected') && this.loading) {
      this.loading = false
    }
  }

  onDisconnectWallet() {
    onDisconnectSubject.next()
    this.showPopover = false
  }

  private notConnectedTemplate() {
    return this.loading
      ? html`<radix-button @onClick=${this.cancelConnect}>Cancel</radix-button>`
      : html`<div class="connect--wrapper">
            <img class="logo" src=${logoGradient} />
            <span class="connect--text">Connect your Radix Wallet</span>
          </div>
          <radix-button @onClick=${this.onConnect}>Connect Now</radix-button>
          <a href=${config.links['What is a radix wallet?']} target="_blank"
            >What is a Radix Wallet?</a
          >`
  }

  popoverTemplate() {
    return this.showPopover
      ? html`<radix-popover class="popover">
          ${this.connected
            ? html`<radix-button
                class="no-logo text"
                @onClick=${this.onDisconnectWallet}
                >Disconnect Wallet</radix-button
              >`
            : this.notConnectedTemplate()}
        </radix-popover>`
      : ''
  }

  render() {
    return html`
      <div class="main--wrapper">
        ${this.connectButtonTemplate()} ${this.popoverTemplate()}
      </div>
    `
  }

  static styles = css`
    :host {
      font-family: 'IBM Plex Sans';
      position: relative;
    }
    .main--wrapper {
      width: 8.6rem;
    }
    .popover {
      position: absolute;
      top: calc(100% + 1rem);
      right: calc(100% - 8.6rem);
    }
    .connect--wrapper {
      display: flex;
      margin-bottom: 1.5rem;
    }
    .connect--text {
      color: ${color.radixGrey1};
      font-style: normal;
      font-weight: 700;
      font-size: 1.1rem;
      width: 10rem;
      margin-left: 0.9rem;
      font-weight: 600;
    }
    .logo {
      width: 3rem;
      align-self: center;
    }
    a::before {
      position: relative;
      top: 0.2rem;
      padding-right: 0.2rem;
      content: url(${unsafeCSS(infoIcon)});
    }
    a {
      margin-top: 1.2rem;
      text-decoration: none;
      color: ${color.radixBlue};
      font-weight: 600;
      display: inline-block;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    [config.elementTag]: ConnectButton
  }
}
