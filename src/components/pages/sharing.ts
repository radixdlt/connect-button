import { html, css, LitElement, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Mode, themeCSS } from '../../styles/theme'
import { Account } from '../../_types'
import '../account/account'
import '../card/persona-card'
import '../popover/popover'
import '../tabs-menu/tabs-menu'
import RefreshIcon from '../../assets/refresh.svg'
import LogoutIcon from '../../assets/logout.svg'

@customElement('radix-sharing-page')
export class RadixSharingPage extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: Mode = 'light'

  @property({
    type: String,
  })
  avatarUrl: string = ''

  @property({
    type: String,
  })
  persona: string = ''

  @property({
    type: String,
  })
  dAppName: string = ''

  @property({
    type: Array,
  })
  personaData: string[] = []

  @property({
    type: Array,
  })
  accounts: Account[] = []

  private onUpdateData(event: MouseEvent) {
    this.dispatchEvent(
      new CustomEvent('onUpdateData', {
        detail: event,
        bubbles: true,
        composed: true,
      })
    )
  }

  private onLogout(event: MouseEvent) {
    this.dispatchEvent(
      new CustomEvent('onLogout', {
        detail: event,
        bubbles: true,
        composed: true,
      })
    )
  }

  render() {
    return html` <radix-popover mode=${this.mode} connected>
      <radix-tabs-menu mode=${this.mode}></radix-tabs-menu>
      <span class="header">Sharing with ${this.dAppName}</span>
      <div class="content">
        <radix-persona-card
          avatarUrl=${this.avatarUrl}
          mode=${this.mode}
          persona=${this.persona}
          .personaData=${this.personaData}
        ></radix-persona-card>
        <div>
          ${this.accounts.map(
            ({ label, address, appearanceId }) =>
              html`<radix-account
                label=${label}
                address=${address}
                appearanceId=${appearanceId}
              ></radix-account>`
          )}
        </div>
      </div>
      <div class="buttons">
        <button id="update-data" @click=${this.onUpdateData}>
          Update data sharing
        </button>
        <button id="logout" @click=${this.onLogout}>Log out</button>
      </div>
    </radix-popover>`
  }

  static styles = [
    themeCSS,
    css`
      .header {
        font-size: 18px;
        font-weight: 600;
        margin: 20px 0px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        text-align: center;
      }
      .content {
        max-height: 376px;
        overflow: auto;
        width: 100%;
        margin-bottom: 0px;
        position: relative;
        padding-bottom: 10px;
        -webkit-mask-image: linear-gradient(
          180deg,
          black 90%,
          transparent 100%
        );
        mask-image: linear-gradient(180deg, black 90%, transparent 95%);
      }
      .buttons {
        display: grid;
        bottom: 0;
        width: 100%;
        grid-template-columns: 1fr 143px;
        grid-gap: 10px;
        width: 100%;
        padding: 10px 0;
        align-items: end;
      }
      button {
        padding: 12px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }

      button::before {
        content: '';
        -webkit-mask-position: center;
        mask-position: center;
        -webkit-mask-size: cover;
        mask-size: cover;
        background: var(--radix-button-text-color);
        display: block;
        width: 20px;
        height: 20px;
      }

      #update-data::before {
        -webkit-mask-image: url(${unsafeCSS(RefreshIcon)});
        mask-image: url(${unsafeCSS(RefreshIcon)});
      }

      #logout::before {
        -webkit-mask-image: url(${unsafeCSS(LogoutIcon)});
        mask-image: url(${unsafeCSS(LogoutIcon)});
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-sharing-page': RadixSharingPage
  }
}
