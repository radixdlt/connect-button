import { html, css, LitElement, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { classMap } from 'lit/directives/class-map.js'
import { themeCSS } from '../../styles/theme'
import './card'
import '../account/account'
import AvatarPlaceholder from '../../assets/avatar-placeholder.svg'
import { RadixButtonMode } from '../../_types'

@customElement('radix-persona-card')
export class RadixPersonaCard extends LitElement {
  @property({
    type: String,
    reflect: true,
  })
  mode: RadixButtonMode = RadixButtonMode.light

  @property({
    type: String,
    reflect: true,
  })
  icon?: 'unchecked' | 'checked' | 'pending' | 'success' | 'error'

  @property({
    type: String,
  })
  persona: string = ''

  @property({
    type: String,
  })
  avatarUrl?: string

  @property({
    type: Array,
  })
  personaData: string[] = []

  render() {
    return html`<radix-card mode=${this.mode}>
      <div
        class=${classMap({
          center: (this.personaData || []).length < 2,
          'persona-card': true,
        })}
      >
        <div class="placeholder">
          <div
            class="avatar"
            style=${styleMap({
              backgroundImage: `url(${unsafeCSS(this.avatarUrl)})`,
            })}
          ></div>
        </div>
        <div class="content">
          <span class="persona">${this.persona}</span>
          <ul>
            ${(this.personaData || []).map((item) => html`<li>${item}</li>`)}
          </ul>
        </div>
      </div></radix-card
    >`
  }

  static styles = [
    themeCSS,
    css`
      :host {
        display: flex;
        width: 100%;
        margin-bottom: 20px;
      }

      .avatar {
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border-radius: 50%;
        width: 80px;
        height: 80px;
        align-self: center;
        border: 2px solid var(--radix-avatar-border-color);
      }

      .placeholder {
        width: 84px;
        height: 84px;
        background-image: url(${unsafeCSS(AvatarPlaceholder)});
      }

      .persona-card {
        display: grid;
        gap: 20px;
        align-items: flex-start;
        grid-template-columns: 1fr 255px;
      }

      .persona-card.center {
        align-items: center;
      }

      .persona {
        font-size: 18px;
        font-weight: 600;
        text-overflow: ellipsis;
        overflow: hidden;
        display: block;
        white-space: nowrap;
      }

      ul {
        margin-top: 10px;
        margin-bottom: 0;
        padding-inline-start: 25px;
      }

      li {
        font-size: 14px;
        word-break: break-word;
      }
    `,
  ]
}

declare global {
  interface HTMLElementTagNameMap {
    'radix-persona-card': RadixPersonaCard
  }
}